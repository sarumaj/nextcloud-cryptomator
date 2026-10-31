// SPDX-License-Identifier: AGPL-3.0-or-later
//
// Writes the test vaults with Cryptomator's own library (cryptofs), so that the
// app's decryption is checked against what Cryptomator itself writes, not
// against our reading of the format. One vault per cipher combination, each
// with manifest.json: every path with its type, size and SHA-256 (or a link's
// target).

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.FileSystem;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;
import java.util.stream.Stream;

import org.cryptomator.cryptofs.CryptoFileSystemProperties;
import org.cryptomator.cryptofs.CryptoFileSystemProvider;
import org.cryptomator.cryptolib.api.CryptorProvider;
import org.cryptomator.cryptolib.api.Masterkey;
import org.cryptomator.cryptolib.common.MasterkeyFileAccess;

public class Generate {
	static final String PASSWORD = "correct horse ✓ battery";

	public static void main(String[] args) throws Exception {
		Path out = Path.of(args[0]);
		write(out.resolve("vault-gcm"), CryptorProvider.Scheme.SIV_GCM);
		write(out.resolve("vault-ctrmac"), CryptorProvider.Scheme.SIV_CTRMAC);
	}

	static void write(Path vault, CryptorProvider.Scheme scheme) throws Exception {
		Files.createDirectories(vault);
		SecureRandom random = SecureRandom.getInstanceStrong();
		Masterkey masterkey = Masterkey.generate(random);
		new MasterkeyFileAccess(new byte[0], random).persist(masterkey, vault.resolve("masterkey.cryptomator"), PASSWORD);
		CryptoFileSystemProperties properties = CryptoFileSystemProperties.cryptoFileSystemProperties()
				.withKeyLoader(uri -> masterkey.copy())
				.withCipherCombo(scheme)
				.build();
		CryptoFileSystemProvider.initialize(vault, properties, URI.create("masterkeyfile:masterkey.cryptomator"));

		Map<String, Map<String, Object>> manifest = new TreeMap<>();
		try (FileSystem fs = CryptoFileSystemProvider.newFileSystem(vault, properties)) {
			Path root = fs.getPath("/");
			Random content = new Random(42);
			file(root, "hello.txt", "Hello, vault!\n".getBytes(StandardCharsets.UTF_8));
			file(root, "Zażółć gęślą jaźń ✓.txt", "Polish letters\n".getBytes(StandardCharsets.UTF_8));
			file(root, "empty.txt", new byte[0]);
			file(root, "one-chunk.bin", bytes(content, 32768));
			file(root, "chunks.bin", bytes(content, 100000));
			file(root, "Docs & Stuff/inner/deep.txt", "nested\n".getBytes(StandardCharsets.UTF_8));
			// Names whose encrypted form passes the shortening threshold (220): stored
			// as <hash>.c9s with name.c9s beside the contents.
			String longName = "a-very-long-name-".repeat(10) + "end";
			file(root, longName + ".txt", "long name\n".getBytes(StandardCharsets.UTF_8));
			file(root, longName + "-folder/inside.txt", "in a long-named folder\n".getBytes(StandardCharsets.UTF_8));
			Files.createSymbolicLink(root.resolve("link-to-hello"), fs.getPath("hello.txt"));

			try (Stream<Path> paths = Files.walk(root)) {
				for (Path path : paths.toList()) {
					if (path.equals(root)) {
						continue;
					}
					Map<String, Object> entry = new TreeMap<>();
					if (Files.isSymbolicLink(path)) {
						entry.put("type", "link");
						entry.put("target", Files.readSymbolicLink(path).toString());
					} else if (Files.isDirectory(path)) {
						entry.put("type", "dir");
					} else {
						byte[] data = Files.readAllBytes(path);
						entry.put("type", "file");
						entry.put("size", data.length);
						entry.put("sha256", HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(data)));
					}
					manifest.put(root.relativize(path).toString(), entry);
				}
			}
		}
		Map<String, Object> document = new TreeMap<>();
		document.put("password", PASSWORD);
		document.put("cipherCombo", scheme.name());
		document.put("entries", manifest);
		Files.writeString(vault.getParent().resolve(vault.getFileName() + ".json"), json(document) + "\n");
	}

	static void file(Path root, String name, byte[] data) throws Exception {
		Path path = root.resolve(name);
		if (path.getParent() != null) {
			Files.createDirectories(path.getParent());
		}
		Files.write(path, data);
	}

	static byte[] bytes(Random random, int length) {
		byte[] data = new byte[length];
		random.nextBytes(data);
		return data;
	}

	// Enough JSON for strings, numbers, lists and nested maps.
	@SuppressWarnings("unchecked")
	static String json(Object value) {
		if (value instanceof Map<?, ?> map) {
			StringBuilder out = new StringBuilder("{");
			for (Map.Entry<String, Object> entry : ((Map<String, Object>) map).entrySet()) {
				if (out.length() > 1) {
					out.append(", ");
				}
				out.append(json(entry.getKey())).append(": ").append(json(entry.getValue()));
			}
			return out.append("}").toString();
		}
		if (value instanceof List<?> list) {
			StringBuilder out = new StringBuilder("[");
			for (Object item : list) {
				if (out.length() > 1) {
					out.append(", ");
				}
				out.append(json(item));
			}
			return out.append("]").toString();
		}
		if (value instanceof Number) {
			return value.toString();
		}
		String text = value.toString();
		StringBuilder out = new StringBuilder("\"");
		for (char c : text.toCharArray()) {
			switch (c) {
				case '"' -> out.append("\\\"");
				case '\\' -> out.append("\\\\");
				default -> {
					if (c < 0x20) {
						out.append(String.format("\\u%04x", (int) c));
					} else {
						out.append(c);
					}
				}
			}
		}
		return out.append("\"").toString();
	}
}
