import process from "process";
import ValidationError from "./ValidationError.ts";
const env_ts = await loadEnvFile();
type EnvFile = typeof env_ts;
type EnvKey = Extract<keyof EnvFile, string>;
type Validated<K extends EnvKey> = ReturnType<EnvFile[K]["validateFn"]>;

export default class Env {
  private static instance: Env;
  private values: Map<EnvKey, Validated<any>> = new Map();

  public constructor() {
    if (Env.instance) return Env.instance;
    Env.instance = this;
    this.validate();
  }

  private validate() {
    const keys = Object.keys(env_ts) as EnvKey[];
    for (const key of keys) {
      const raw_value = this.getRawEnvValue(key);
      if (!raw_value) {
        if (env_ts[key].is_optional) return undefined;
        throw `Missing env param "${key}"`;
      }
      try {
        const validated_value = env_ts[key].validateFn(raw_value);
        this.values.set(key, validated_value);
      } catch (error) {
        if (!(error instanceof ValidationError)) throw error;
        const message = `"${key}" ${error.message}`;
        throw message;
      }
    }
  }

  private getRawEnvValue(key: EnvKey): string | undefined {
    return Bun.env[key];
  }

  public static get<K extends EnvKey>(key: K): Validated<K> {
    return this.instance.values.get(key);
  }
}
new Env();

async function loadEnvFile() {
  try {
    // @ts-ignore
    const module = await import(`../../../../env`);
    return module.default;
  } catch (error: any) {
    if (error.name === "ResolveMessage") console.error("MISSING env.ts file");
    if (error.name === "ReferenceError")
      console.error("Don't run env.ts. It parses automatically");
    console.log(error.name);
    process.exit(1);
  }
}
