// SPDX-License-Identifier: AGPL-3.0-or-later
//
// Reads a vault with Cryptomator's own library (cryptofs), the judge of what the
// app writes (tests/compat.test.js):
//
//   java Verify <vault folder> <password>
//
// prints one JSON document: every entry as Cryptomator sees it (type, size,
// SHA-256 or a link's target; each file read by its path, so that cryptofs looks
// it up by name as Cryptomator does), and the findings of cryptofs' health
// checks (those with a severity above GOOD, by check).

import java.net.URI;
import java.nio.file.FileSystem;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HexFormat;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.stream.Stream;

import org.cryptomator.cryptofs.CryptoFileSystemProperties;
import org.cryptomator.cryptofs.CryptoFileSystemProvider;
import org.cryptomator.cryptofs.VaultConfig;
import org.cryptomator.cryptofs.health.api.DiagnosticResult;
import org.cryptomator.cryptofs.health.api.HealthCheck;
import org.cryptomator.cryptolib.api.Cryptor;
import org.cryptomator.cryptolib.api.CryptorProvider;
import org.cryptomator.cryptolib.api.Masterkey;
import org.cryptomator.cryptolib.common.MasterkeyFileAccess;

public class Verify {
	public static void main(String[] args) throws Exception {
		Path vault = Path.of(args[0]);
		String password = args[1];
		SecureRandom random = SecureRandom.getInstanceStrong();
		Masterkey masterkey = new MasterkeyFileAccess(new byte[0], random).load(vault.resolve("masterkey.cryptomator"), password);

		Map<String, Object> entries = new TreeMap<>();
		CryptoFileSystemProperties properties = CryptoFileSystemProperties.cryptoFileSystemProperties()
				.withKeyLoader(uri -> masterkey.copy())
				.build();
		try (FileSystem fs = CryptoFileSystemProvider.newFileSystem(vault, properties)) {
			Path root = fs.getPath("/");
			try (Stream<Path> paths = Files.walk(root)) {
				for (Path path : paths.toList()) {
					if (path.equals(root)) {
						continue;
					}
					String name = root.relativize(path).toString();
					// Looked up again by its name, as Cryptomator opens a path.
					Path byName = fs.getPath("/" + name);
					Map<String, Object> entry = new TreeMap<>();
					if (Files.isSymbolicLink(byName)) {
						entry.put("type", "link");
						entry.put("target", Files.readSymbolicLink(byName).toString());
					} else if (Files.isDirectory(byName)) {
						entry.put("type", "dir");
					} else {
						byte[] data = Files.readAllBytes(byName);
						entry.put("type", "file");
						entry.put("size", data.length);
						entry.put("sha256", HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(data)));
					}
					entries.put(name, entry);
				}
			}
		}

		List<Object> findings = new ArrayList<>();
		String token = Files.readString(vault.resolve("vault.cryptomator"));
		VaultConfig config = VaultConfig.decode(token).verify(masterkey.getEncoded(), 8);
		try (Cryptor cryptor = CryptorProvider.forScheme(config.getCipherCombo()).provide(masterkey.copy(), random)) {
			ExecutorService executor = Executors.newSingleThreadExecutor();
			for (HealthCheck check : HealthCheck.allChecks()) {
				try (Stream<DiagnosticResult> results = check.check(vault, config, masterkey, cryptor, executor)) {
					results.filter(result -> result.getSeverity() != DiagnosticResult.Severity.GOOD).forEach(result -> {
						Map<String, Object> finding = new TreeMap<>();
						finding.put("check", check.name());
						finding.put("severity", result.getSeverity().name());
						finding.put("result", result.toString());
						findings.add(finding);
					});
				}
			}
			executor.shutdown();
		}

		Map<String, Object> document = new TreeMap<>();
		document.put("entries", entries);
		document.put("findings", findings);
		System.out.println(Generate.json(document));
	}
}
