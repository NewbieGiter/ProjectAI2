export type KimiModelId =
  | 'kimi-k2-thinking-turbo'
  | 'kimi-k2-thinking'
  | 'kimi-k2';

export interface KimiModelDefinition {
  id: KimiModelId;
  /** Human friendly display name */
  name: string;
  /** Optional longer description */
  description?: string;
  /** Whether the model can accept images */
  supportsImages?: boolean;
  /** Acceptable alias strings that should resolve to this model id */
  aliases: string[];
}

export const KIMI_MODEL_DEFINITIONS: KimiModelDefinition[] = [
  {
    id: 'kimi-k2-thinking-turbo',
    name: 'Kimi K2 Thinking Turbo',
    description: 'Fastest K2 model with enhanced reasoning capabilities',
    supportsImages: true,
    aliases: [
      'kimi-k2-thinking-turbo',
      'k2-thinking-turbo',
      'kimi-thinking-turbo',
      'k2-turbo',
      'kimi-turbo',
    ],
  },
  {
    id: 'kimi-k2-thinking',
    name: 'Kimi K2 Thinking',
    description: 'Standard K2 model with strong reasoning',
    supportsImages: true,
    aliases: [
      'kimi-k2-thinking',
      'k2-thinking',
      'kimi-thinking',
    ],
  },
  {
    id: 'kimi-k2',
    name: 'Kimi K2',
    description: 'Base K2 model for general tasks',
    supportsImages: true,
    aliases: [
      'kimi-k2',
      'k2',
      'kimi',
    ],
  },
];

export const KIMI_DEFAULT_MODEL: KimiModelId = 'kimi-k2-thinking-turbo';

const KIMI_MODEL_ALIAS_MAP: Record<string, KimiModelId> = KIMI_MODEL_DEFINITIONS.reduce(
  (map, definition) => {
    definition.aliases.forEach(alias => {
      const key = alias.trim().toLowerCase().replace(/[\s_]+/g, '-');
      map[key] = definition.id;
    });
    map[definition.id.toLowerCase()] = definition.id;
    return map;
  },
  {} as Record<string, KimiModelId>
);

export function normalizeKimiModelId(model?: string | null): KimiModelId {
  if (!model) return KIMI_DEFAULT_MODEL;
  const normalized = model.trim().toLowerCase().replace(/[\s_]+/g, '-');
  return KIMI_MODEL_ALIAS_MAP[normalized] ?? KIMI_DEFAULT_MODEL;
}

export function getKimiModelDefinition(id: string): KimiModelDefinition | undefined {
  return (
    KIMI_MODEL_DEFINITIONS.find(def => def.id === id) ??
    KIMI_MODEL_DEFINITIONS.find(def =>
      def.aliases.some(alias => alias.toLowerCase() === id.toLowerCase())
    )
  );
}

export function getKimiModelDisplayName(id: string): string {
  return getKimiModelDefinition(id)?.name ?? id;
}
