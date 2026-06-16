export interface PlayMarkPixel {
  x: number;
  y: number;
  fill: string;
}

const ACCENT = "var(--vee-accent)";
const ACCENT_BRIGHT = "var(--vee-accent-bright)";
const ACCENT_DIM = "var(--vee-accent-dim)";
const EYE_WHITE = "#eafff3";
const PUPIL = "var(--vee-black)";

/**
 * Builds the Vee frog-play brand mark on an 18x18 pixel grid: a rounded arcade
 * body with a play triangle cut from the negative space and two frog eyes on
 * top. Returns the body/eye pixels plus the lid pixels (rendered separately so
 * they can blink). Pure and deterministic, evaluated once at module load.
 */
function buildPlayMark(): {
  pixels: PlayMarkPixel[];
  lids: Array<[number, number]>;
} {
  const base = new Map<string, string>();
  const whites = new Map<string, string>();
  const lids: Array<[number, number]> = [];
  const setPixel = (map: Map<string, string>, x: number, y: number, fill: string) =>
    map.set(`${x},${y}`, fill);

  const bx0 = 2;
  const bx1 = 15;
  const by0 = 5;
  const by1 = 16;
  const cutCorners = [
    [bx0, by0], [bx0 + 1, by0], [bx0, by0 + 1], [bx1, by0], [bx1 - 1, by0], [bx1, by0 + 1],
    [bx0, by1], [bx0 + 1, by1], [bx0, by1 - 1], [bx1, by1], [bx1 - 1, by1], [bx1, by1 - 1],
  ];
  const isCorner = (x: number, y: number) =>
    cutCorners.some((corner) => corner[0] === x && corner[1] === y);

  const body = new Set<string>();
  for (let y = by0; y <= by1; y++) {
    for (let x = bx0; x <= bx1; x++) {
      if (!isCorner(x, y)) body.add(`${x},${y}`);
    }
  }

  const cut = new Set<string>();
  const pax = 12;
  const pby0 = 7;
  const pby1 = 13;
  const pcy = 10;
  const pbx = 6;
  const ph = 3;
  for (let y = pby0; y <= pby1; y++) {
    const dy = Math.abs(y - pcy);
    const xEnd = pax - Math.round(((pax - pbx) * dy) / ph);
    for (let x = pbx; x <= xEnd; x++) cut.add(`${x},${y}`);
  }

  const cols: Record<number, [number, number]> = {};
  body.forEach((key) => {
    const [x, y] = key.split(",").map(Number);
    cols[x] = cols[x] ?? [99, -1];
    cols[x][0] = Math.min(cols[x][0], y);
    cols[x][1] = Math.max(cols[x][1], y);
  });
  body.forEach((key) => {
    if (cut.has(key)) return;
    const [x, y] = key.split(",").map(Number);
    let fill = ACCENT;
    if (y === cols[x][1]) fill = ACCENT_DIM;
    if (y === cols[x][0] || x === bx0) fill = ACCENT_BRIGHT;
    setPixel(base, x, y, fill);
  });

  [5, 12].forEach((ex) => {
    const dome = [
      [ex - 1, 1], [ex, 1], [ex + 1, 1], [ex - 2, 2], [ex - 1, 2], [ex, 2], [ex + 1, 2], [ex + 2, 2],
      [ex - 2, 3], [ex - 1, 3], [ex, 3], [ex + 1, 3], [ex + 2, 3], [ex - 2, 4], [ex - 1, 4], [ex, 4], [ex + 1, 4], [ex + 2, 4],
    ];
    dome.forEach(([x, y]) => setPixel(base, x, y, y <= 1 ? ACCENT_BRIGHT : ACCENT));
    [[ex - 1, 2], [ex, 2], [ex - 1, 3], [ex, 3]].forEach(([x, y]) => setPixel(whites, x, y, EYE_WHITE));
    setPixel(whites, ex, 2, PUPIL);
    setPixel(whites, ex, 3, PUPIL);
    [[ex - 2, 2], [ex - 1, 2], [ex, 2], [ex + 1, 2], [ex - 2, 3], [ex - 1, 3], [ex, 3], [ex + 1, 3]].forEach(
      ([x, y]) => lids.push([x, y]),
    );
  });

  const pixels: PlayMarkPixel[] = [];
  base.forEach((fill, key) => {
    const [x, y] = key.split(",").map(Number);
    pixels.push({ x, y, fill });
  });
  whites.forEach((fill, key) => {
    const [x, y] = key.split(",").map(Number);
    pixels.push({ x, y, fill });
  });

  return { pixels, lids };
}

const mark = buildPlayMark();

export const PLAY_MARK_PIXELS = mark.pixels;
export const PLAY_MARK_LIDS = mark.lids;
