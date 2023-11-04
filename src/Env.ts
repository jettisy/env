import process from "process";
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
      const validated_value = env_ts[key].validateFn(raw_value);
      this.values.set(key, validated_value);
    }
  }

  private getRawEnvValue(key: EnvKey): string {
    const value = Bun.env[key];
    if (value === undefined) throw new Error(`MISSING ENV VALUE ${key}`);
    return value;
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
  } catch (error) {
    console.log(error);
    console.error("MISSING env.ts file");
    process.exit(1);
  }
}
