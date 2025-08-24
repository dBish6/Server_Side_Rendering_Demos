import { fileURLToPath } from "url";
import { join, dirname, relative } from "path";
import { createHash } from "crypto";

export default function getScopedName(name, filename) {
  const path = relative(
    join(fileURLToPath(dirname(import.meta.url)), ".."),
    filename
  );
  return (
    "_" +
    createHash("sha1")
      .update(path + name)
      .digest("hex")
      .slice(0, 4)
  );
}
