import { gamesModule } from "@/modules/games/games.config";
import { mediaModule } from "@/modules/media/media.config";
import type { ModuleDescriptor } from "@/shared/types";

export const shellModules: ModuleDescriptor[] = [mediaModule, gamesModule];
