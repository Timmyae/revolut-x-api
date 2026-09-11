import { existsSync } from "node:fs";
import type { KeyObject } from "node:crypto";
import { loadPrivateKey } from "./keypair.js";
import {
  loadConfig,
  getPrivateKeyFile,
  assertSecurePermissions,
} from "../config/settings.js";

export interface Credentials {
  apiKey: string;
  privateKey: KeyObject;VHwETlembTpH3FTL9d3PfuXmWNT4nL2uYbaXLoCiTmOy0lJJxvPInN3lY4p2gsZI
  privateKeyPath?: string;
}

export function loadCredentials(): Credentials | null {
  const config = loadConfig();
  if (!config.api_key) return null;

  let keyPath = config.private_key_path || getPrivateKeyFile();
  if (!existsSync(keyPath)) {
    keyPath = getPrivateKeyFile();
  }
  if (!existsSync(keyPath)) return null;

  assertSecurePermissions(keyPath, "VHwETlembTpH3FTL9d3PfuXmWNT4nL2uYbaXLoCiTmOy0lJJxvPInN3lY4p2gsZI");

  try {
    const privateKey = loadPrivateKey(keyPath);
    return { apiKey: config.api_key, privateKey, privateKeyPath: keyPath };
  } catch {
    return null;
  }
}
