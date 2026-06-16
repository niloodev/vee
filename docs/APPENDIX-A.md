

---
---

# Apêndice A — Estudo de caso completo: o CMS

> Esta seção é **exclusivamente de exemplo**. Ela documenta, em alto nível de detalhe, **uma** implementação concreta da arquitetura descrita nas §§1–18: um CMS visual (page builder) construído como aplicação web full-stack. Todo o código aqui é ilustrativo de *como os papéis abstratos foram preenchidos*. **Nada nesta seção redefine a arquitetura** — ela só a torna tangível.
>
> Ao ler, mantenha o mapeamento mental: cada arquivo abaixo é a realização concreta de um *papel* da §3 (`view`, `lógica`, `tipos`, `config`, `barrel`…) dentro de uma *camada* da §2 (`entrada`, `feature`, `domínio`, `infra`, `compartilhado`).

## A.1. O que é o projeto

Um **CMS com editor visual de páginas**: o usuário monta páginas arrastando blocos (tipografia, containers flex, wrappers…), configura propriedades de cada bloco num painel lateral, e publica. As páginas publicadas são servidas em rotas públicas dinâmicas. O editor roda numa área administrativa.

Conceitualmente há **dois grandes fluxos**:

1. **Edição** (área admin): carregar página → editar no canvas → publicar/atualizar.
2. **Renderização pública**: resolver a rota pela *slug* → buscar a página → renderizar os blocos salvos.

## A.2. Stack concreta (preenchendo os slots da §18)

| Slot abstrato | Tecnologia escolhida | Observações |
|---|---|---|
| Framework + entrada/rotas | **Next.js 15** (App Router) + **React 19** | Server Components por padrão; `'use client'` nas Views interativas. |
| Linguagem/tipos | **TypeScript** `strict` | `paths: { "@/*": ["./src/*"] }`. |
| Unidade de lógica | **Hook React** (`use…`) | Arquivo com sufixo `.hook`. |
| Variante de contexto | **`.client`** | Split Server/Client em `pages/`. |
| Motor de blocos + registro | **Puck** (`@measured/puck`) | Consome um `config` com `components`, `root`, `plugins`. |
| Estado compartilhado | **Zustand** via **Context** | Store por instância (não singleton global). |
| Fetch/cache no cliente | **SWR** | Com `onSuccess` global para toasts de erro. |
| Schema + tipos | **Zod** | `IPage = z.infer<typeof pageSchema>`. |
| Persistência local | **MongoDB** + **Mongoose** | Implementação `standalone`. |
| Persistência remota | **cliente de API externa** | Implementação `api` (stub no repo). |
| Seletor de implementação | **`typeSwitcher`** | Dirigido por `process.env.TYPE`. |
| Fronteira de servidor | **Server Actions** (`'use server'`) | Os Controllers. |
| UI kit (admin) | **HeroUI** | Botões, inputs, selects, toasts, tooltips, skeletons. |
| Estilo (admin) | **Tailwind** | Classes utilitárias + `@layer utilities`. |
| Estilo (blocos públicos) | **styled-components** | Props transientes `$prop`; SSR via registry. |
| Animação | **motion** | Fade/transições nas Views. |
| Fronteira de erro | **react-error-boundary** | `withErrorBoundary` nos índices. |
| Ícones | **lucide-react** | — |
| Testes | **Vitest** + Testing Library | — |
| Empacotamento | **Docker** (perfis `standalone`/`api`) | `Dockerfile.standalone` / `Dockerfile.api`. |
| Lint/format | **ESLint** + **Prettier** + **EditorConfig** | Regras versionadas. |

`package.json` (dependências de runtime, resumido): `next`, `react`, `react-dom`, `@measured/puck`, `mongoose`, `zod`, `zustand`, `swr`, `@heroui/react`, `styled-components`, `motion`, `react-error-boundary`, `lodash`, `lucide-react`, `sharp`.

## A.3. Modos de execução (a inversão de dependência, na prática)

`process.env.TYPE` define a fonte de dados em runtime — **sem alterar Views nem Controllers**:

- `standalone` — Next + MongoDB local (Mongoose).
- `api` — Next sem banco local, conversando com uma API externa.

`next.config.ts`:
```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: process.env.TYPE === 'standalone' ? undefined : 'standalone',
    compiler: { styledComponents: true },
}
export default nextConfig
```

`docker-compose.yml` usa **profiles** (`standalone` sobe o serviço `db` Mongo; `api` não):
```yaml
services:
  db:
    image: mongo:latest
    profiles: [standalone]
    # ...
  web:
    build: { context: ., dockerfile: ./Dockerfile.${TYPE} }
    environment: [TYPE=${TYPE}, MONGO_HOST=db, ...]
    profiles: [standalone, api]
```

`.env` (chaves relevantes): `TYPE=standalone|api`, `NEXT_PORT`, `ENV`, `MONGO_*`, `API_URL`.

## A.4. Árvore de diretórios real

```
src/
├── app/                                  # CAMADA DE ENTRADA (rotas finas)
│   ├── layout.tsx                        # root: metadata, <html lang="pt-BR">, GlobalProviders
│   ├── [...slug]/page.tsx                # rota pública (catch-all) → RenderPage
│   └── admin/
│       ├── layout.tsx                    # AdminProviders + fonte Poppins + admin.global.css
│       └── editor/[[...id]]/
│           ├── page.tsx                  # rota do editor (optional catch-all) → EditorPage
│           └── loading.tsx               # UI de carregamento da rota
│
├── core/                                 # CAMADA DE DOMÍNIO + INFRA
│   ├── assets/admin.global.css           # CSS global do admin (utilities)
│   ├── controllers/
│   │   ├── controllers.types.ts          # BaseResponse / BaseError (envelope)
│   │   └── pages/
│   │       ├── pages.ts                  # 'use server' — as actions
│   │       ├── pages.types.ts            # IPageController
│   │       ├── pages.errors.ts           # catálogo de erros (pt-BR)
│   │       └── index.ts
│   ├── models/
│   │   └── pages/
│   │       ├── pages.schemas.ts          # Zod (fonte da verdade)
│   │       ├── pages.types.ts            # IPage / IPageResponse / IPageModels
│   │       ├── pages.ts                  # typeSwitcher → escolhe a impl
│   │       ├── index.ts
│   │       ├── standalone/               # impl Mongoose
│   │       │   ├── standalone.ts
│   │       │   ├── standalone.schemas.ts # Mongoose Schema/Model
│   │       │   └── index.ts
│   │       └── api/                       # impl API externa (stub)
│   │           ├── api.ts
│   │           └── index.ts
│   ├── providers/
│   │   ├── providers.tsx                  # GlobalProviders / AdminProviders
│   │   ├── index.ts
│   │   └── StyledComponentsRegistry/      # SSR de styled-components
│   ├── services/
│   │   ├── mongodb/                       # connectDB / disconnectDB (singleton)
│   │   └── api/                           # (placeholder)
│   └── tools/
│       └── typeSwitcher/                  # seletor por ambiente
│
├── modules/                               # CAMADA DE FEATURES
│   └── editor/
│       ├── components/                    # Atomic Design
│       │   ├── atoms/                     # AddButton, ImageButton, ComponentItem,
│       │   │                              #   ComponentsWrapper, FieldsWrapper,
│       │   │                              #   MenuTitle, PropertyContainer, PropertyTitle
│       │   ├── molecules/                 # PublishButton, PageStatus, ViewportButtons,
│       │   │                              #   MenuSelector, DeleteButton, ViewportStyledInjection
│       │   ├── organisms/                 # Header, MenusSidebar, PropertiesSidebar, Preview
│       │   └── pages/                     # EditorPage (split), RenderPage (split)
│       ├── fields/                        # FieldText, FieldNumber, FieldSelect, FieldFiles(+sub)
│       ├── menus/                         # PagesMenu, ComponentsMenu, OutlineMenu, Gallery*, Typography*
│       ├── properties/                    # ComponentsProperties(+sub), PagesProperties, Gallery*, Typography*
│       ├── providers/                     # EditorProviders, SWREditorConfig
│       ├── services/                      # createOrUpdatePage
│       ├── store/editorSlice/             # Zustand + Context (4 arquivos)
│       ├── editor.config.tsx              # config do Puck (plugins, fieldTypes, root, components)
│       ├── editor.constants.tsx           # viewports, menus, defaultMenu
│       └── editor.types.ts                # Menu, Menus
│
├── sets/                                  # BIBLIOTECA DE BLOCOS (config-driven)
│   ├── index.ts                           # setupSets({ genericSet })
│   └── generic/
│       ├── index.ts
│       └── components/
│           ├── Flex/                       # DropZone + fields
│           ├── Typography/                 # styled + fields
│           └── Wrapper/                    # DropZone + styled + fields
│
└── shared/                                # CAMADA TRANSVERSAL
    ├── assets/img/
    ├── hooks/useServerAction/
    └── tools/
        ├── setupComponent/                 # fábrica de bloco Puck
        ├── setupSets/                      # agregador de registro
        └── fieldValidator/                 # Zod → validator do Puck
```

---

## A.5. Camada `core` (domínio MVC + infra)

### A.5.1. Envelope de resposta — `controllers/controllers.types.ts`

A borda normalizada da §10.4, concretizada:
```ts
export interface BaseResponse<T> {
    message: string
    payload: T
}
export interface BaseError<T extends string> {
    error: T
}
```

### A.5.2. Controller — `controllers/pages/`

`pages.errors.ts` — catálogo de erros central (referenciado por nome em todo lugar):
```ts
export const pageErrors = {
    pageNotFound: 'Página não encontrada',
    pageAlreadyExists: 'Página já existe',
    idIsRequired: 'ID é obrigatório',
    pageNotCreated: 'Página não criada',
    pageNotValid: 'Dados da página inválidos',
    pageNotUpdated: 'Página não atualizada',
    slugAlreadyExists: 'Rota já está em uso',
    slugIsRequired: 'Rota é obrigatória',
}
```

`pages.types.ts` — o contrato do controller (cada método retorna o envelope):
```ts
type PageErrorsKeys = keyof typeof pageErrors
export interface IPageController {
    getPages: () => Promise<BaseResponse<IPage[]> | BaseError<(typeof pageErrors)[PageErrorsKeys]>>
    getPageBySlug: (slug: string) => Promise<BaseResponse<IPage> | BaseError<...>>
    getPageById: (id: string) => Promise<BaseResponse<IPage> | BaseError<...>>
    createPage: (page: IPage) => Promise<BaseResponse<IPage> | BaseError<...>>
    updatePage: (page: IPage) => Promise<BaseResponse<IPage> | BaseError<...>>
}
```

`pages.ts` — as Server Actions. Cada uma: valida (Zod) → chama o Model → normaliza/ traduz erro:
```ts
'use server'
import { pageSchema } from '@/core/models/pages/pages.schemas'
import { IPageController } from './pages.types'
import {
    getPages as getPagesModel,
    createPage as createPageModel,
    getPageBySlug as getPageBySlugModel,
    updatePage as updatePageModel,
    getPageById as getPageByIdModel,
} from '@/core/models/pages'
import { pageErrors } from './pages.errors'

export const getPageBySlug: IPageController['getPageBySlug'] = async slug => {
    if (!slug) return { error: pageErrors.slugIsRequired }
    const page = await getPageBySlugModel(slug)
    return { message: 'Página carregada com sucesso', payload: page }
}

export const createPage: IPageController['createPage'] = async page => {
    if (!pageSchema.safeParse(page).success) return { error: pageErrors.pageNotValid }
    try {
        const newPage = await createPageModel(page)
        return { message: 'Página criada com sucesso', payload: newPage }
    } catch (error) {
        if (error instanceof Error && error.message === pageErrors.slugAlreadyExists)
            return { error: pageErrors.slugAlreadyExists }
        throw error
    }
}

export const updatePage: IPageController['updatePage'] = async page => {
    if (!page._id) return { error: pageErrors.idIsRequired }
    if (!pageSchema.safeParse(page).success) return { error: pageErrors.pageNotValid }
    try {
        const updatedPage = await updatePageModel(page)
        return { message: 'Página atualizada com sucesso', payload: updatedPage }
    } catch (error) {
        if (error instanceof Error && error.message === pageErrors.slugAlreadyExists)
            return { error: pageErrors.slugAlreadyExists }
        throw error
    }
}
// getPages e getPageById seguem o mesmo formato.
```

Observe: o Controller **nunca** toca em Mongoose; ele chama o Model importado de `@/core/models/pages`, que por sua vez decide a implementação via `typeSwitcher`.

### A.5.3. Model — `models/pages/`

`pages.schemas.ts` — **fonte única da verdade**; tipos derivam daqui:
```ts
import { z } from 'zod'
import { Data } from '@measured/puck'

export const pageSchema = z.object({
    _id: z.string().optional(),
    title: z.string().nonempty('Título da página é obrigatório'),
    slug: z
        .string()
        .nonempty('Slug da página é obrigatório')
        .regex(
            /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*)?$/,
            'Slug da página deve começar com / e pode conter letras minúsculas, números e hífens. Exemplo: /minha-pagina',
        ),
    content: z.custom<Data>(val => typeof val === 'object' && val !== null),
})
```

`pages.types.ts` — tipos derivados + a interface que **toda** implementação cumpre:
```ts
export type IPage = z.infer<typeof pageSchema>
export type IPageResponse = IPage & { _id: string }

export interface IPageModels {
    getPages: () => Promise<IPageResponse[]>
    getPageBySlug: (slug: string) => Promise<IPageResponse>
    getPageById: (id: string) => Promise<IPageResponse>
    createPage: (page: IPage) => Promise<IPageResponse>
    updatePage: (page: Partial<IPage>) => Promise<IPageResponse>
}
```

`pages.ts` — o ponto de inversão de dependência (uma interface, duas implementações, seletor):
```ts
import { IPageModels } from './pages.types'
import { pageModels as StandalonePageModels } from './standalone'
import { pageModels as ApiPageModels } from './api'
import { typeSwitcher } from '@/core/tools'

export const pageModels = typeSwitcher<IPageModels>({
    switch: { standalone: StandalonePageModels, api: ApiPageModels },
})

export const getPages = pageModels.getPages
export const createPage = pageModels.createPage
export const getPageBySlug = pageModels.getPageBySlug
export const getPageById = pageModels.getPageById
export const updatePage = pageModels.updatePage
```

`standalone/standalone.schemas.ts` — Mongoose, com guarda contra recompilação de model:
```ts
import mongoose, { Schema } from 'mongoose'
import { IPage } from '../pages.types'

export const pagesSchema = new Schema<IPage>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: Object, required: true, /* root/content/zones... */ },
    },
    { minimize: false },
)

export const pagesModel = mongoose?.models?.Pages || mongoose.model('Pages', pagesSchema)
```

`standalone/standalone.ts` — implementação real (conecta, consulta, mapeia documento→DTO, traduz erro de índice único em `slugAlreadyExists`):
```ts
import { connectDB } from '@/core/services/mongodb'
import { IPageModels } from '../pages.types'
import { pagesModel } from './standalone.schemas'
import { mongo } from 'mongoose'
import { pageErrors } from '@/core/controllers/pages/pages.errors'

const createPage: IPageModels['createPage'] = async newPage => {
    await connectDB()
    try {
        const created = await pagesModel.create(newPage)
        return {
            title: created.title, slug: created.slug,
            content: created.content, name: created.name,
            _id: created._id.toString(),
        }
    } catch (error) {
        if (error instanceof mongo.MongoServerError && error.code === 11000)
            throw new Error(pageErrors.slugAlreadyExists)
        throw new Error(pageErrors.pageNotCreated)
    }
}

const updatePage: IPageModels['updatePage'] = async page => {
    await connectDB()
    const existing = await pagesModel.findById(page._id)
    if (!existing) throw new Error(pageErrors.pageNotFound)
    Object.assign(existing, page)
    try {
        const updated = await existing.save()
        return { title: updated.title, slug: updated.slug, content: updated.content,
                 name: updated.name, _id: updated._id.toString() }
    } catch (error) {
        if (error instanceof mongo.MongoServerError && error.code === 11000)
            throw new Error(pageErrors.slugAlreadyExists)
        throw new Error(pageErrors.pageNotUpdated)
    }
}
// getPages/getPageBySlug/getPageById: connectDB() + find/findOne/findById + map → DTO
export const pageModels: IPageModels = { getPages, createPage, getPageBySlug, getPageById, updatePage }
```

`api/api.ts` — a outra implementação, satisfazendo a **mesma** interface (aqui como stub que loga e devolve mocks):
```ts
const getPages: IPageModels['getPages'] = async () => { console.log('API Pages Fetched'); return [] }
const createPage: IPageModels['createPage'] = async () => { console.log('API Page Created'); return {...} }
// ...
export const pageModels: IPageModels = { getPages, createPage, getPageBySlug, getPageById, updatePage }
```

### A.5.4. Ferramenta de seleção — `tools/typeSwitcher/`

```ts
// typeSwitcher.types.ts
export type Types = 'standalone' | 'api'
export interface ITypeSwitcherProps<T> { switch: { [key in Types]: T } }

// typeSwitcher.ts  (note o JSDoc — comentário é esperado só em tools genéricas)
/**
 * Retorna o objeto/função correspondente ao tipo de ambiente atual.
 */
export const typeSwitcher = <T>(props: ITypeSwitcherProps<T>) =>
    props.switch[(process.env.TYPE as Types) ?? 'standalone']
```

### A.5.5. Service de infraestrutura — `services/mongodb/`

```ts
import mongoose, { Mongoose } from 'mongoose'

export let mongoClient: Mongoose

export const connectDB = async () => {
    if (mongoClient) return mongoClient   // conexão reaproveitada (singleton)
    mongoClient = await mongoose.connect(
        `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:...@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=admin`,
    )
    return mongoClient
}
export const disconnectDB = async () => { await mongoose.disconnect() }
```

### A.5.6. Provedores globais — `providers/`

`providers.tsx` (dois níveis de provider global):
```tsx
'use client'
import { ToastProvider, HeroUIProvider } from '@heroui/react'
import { StyledComponentsRegistry } from './StyledComponentsRegistry'

export function AdminProviders({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <ToastProvider placement="top-center" toastOffset={5} />
            {children}
        </HeroUIProvider>
    )
}
export function GlobalProviders({ children }: { children: React.ReactNode }) {
    return <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
}
```

`StyledComponentsRegistry` — coleta as regras de estilo no servidor e injeta via `useServerInsertedHTML` (SSR correto de CSS-in-JS).

---

## A.6. Camada de entrada — `app/` (rotas finas)

`app/layout.tsx` — root: metadata extensa, `viewport`, `<html lang="pt-BR">`, embala em `GlobalProviders`.

`app/admin/layout.tsx`:
```tsx
import '@/core/assets/admin.global.css'
import { AdminProviders } from '@/core/providers'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-poppins', display: 'swap' })

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminProviders><div className={`${poppins.variable} contents`}>{children}</div></AdminProviders>
}
```

`app/admin/editor/[[...id]]/page.tsx` — rota do editor (só parseia e delega):
```tsx
import { EditorPage } from '@/modules/editor/components/pages'

export default async function Editor({ params }: { params: Promise<{ id: string[] }> }) {
    const { id } = await params
    return <EditorPage id={id?.[0]} />
}
```

`app/[...slug]/page.tsx` — rota pública (parseia → Controller → delega ou `notFound`):
```tsx
import { getPageBySlug } from '@/core/controllers/pages'
import { notFound } from 'next/navigation'
import { RenderPage } from '@/modules/editor/components/pages'

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params
    const data = await getPageBySlug(`/${slug.join('/')}`)
    if ('error' in data || !data?.payload?._id) notFound()
    return <RenderPage page={data.payload} />
}
```

`app/admin/editor/[[...id]]/loading.tsx` — UI de loading da rota (logo animado).

---

## A.7. Módulo `editor` — arquivos de raiz

`editor.types.ts` — tipos compartilhados da feature; note como `menu`/`properties` são **chaves tipadas** dos respectivos módulos (o registro vira type-safe):
```ts
import * as menusModules from './menus'
import * as propertiesModules from './properties'

export interface Menu {
    icon: ReactNode
    title: string
    menu?: keyof typeof menusModules
    properties?: keyof typeof propertiesModules
    disabled?: boolean
}
export type Menus = Array<Array<Menu>>
```

`editor.constants.tsx` — `viewports` (Desktop/Tablet/Mobile com larguras 1440/768/360), a matriz `menus` (Páginas, Visão Geral, Componentes, Tipografia*, Galeria* — os dois últimos `disabled: true`) e `defaultMenu = menus[0][0]`.

`editor.config.tsx` — **a "cola" entre o motor (Puck) e os componentes da feature**. Faz 4 coisas:
1. `uiConfig` — estado de UI inicial (viewport corrente).
2. `plugins` — overrides do Puck: injeta o registry de styled no iframe (`ViewportStyledInjection`), troca os contêineres (`ComponentsWrapper`, `ComponentItem`, `FieldsWrapper`) e **substitui os tipos de campo nativos** pelos campos próprios:
```tsx
fieldTypes: {
    text:   ({ onChange, value, field }) => <FieldText onValueChange={onChange} value={value} label={field.label} validator={field.validator} />,
    number: ({ onChange, value, field }) => <FieldNumber onValueChange={onChange} value={value} label={field.label} validator={field.validator} />,
    select: ({ onChange, value, field }) => <FieldSelect label={field.label} validator={field.validator} onSelectionChange={v => onChange(v.currentKey)} selectedKeys={[value]} items={field.options} />,
},
```
3. `rootFields` / `rootDefaultProps` — campos do "root" da página (título, slug) com validação derivada do `pageSchema` via `fieldValidator`.
4. `config` — junta tudo: `{ root: { fields, defaultProps }, components: sets }`.

---

## A.8. Estado — `store/editorSlice/` (Zustand + Context, por instância)

`editorSlice.ts`:
```ts
import { createStore } from 'zustand'
import { defaultMenu } from '@/modules/editor/editor.constants'

export const defaultEditorState: EditorState = { selectedMenu: defaultMenu, publishedData: null }

export const createEditorStore = (initialState: EditorState) =>
    createStore<EditorStore>()(set => ({
        ...initialState,
        setSelectedMenu: menu => set(() => ({ selectedMenu: menu })),
        setPublishedData: data => set(() => ({ publishedData: data })),
    }))
```

`editorSlice.types.ts` — separa State × Actions:
```ts
export interface EditorState { selectedMenu: Menu; publishedData: IPage | null }
export interface EditorActions {
    setSelectedMenu: (menu: Menu) => void
    setPublishedData: (data: IPage) => void
}
export type EditorStore = EditorState & EditorActions
export type EditorStoreApi = ReturnType<typeof createEditorStore>
```

`editorSlice.context.tsx` — provider cria a store **uma vez** (`useRef`) e acessor lança erro fora do provider:
```tsx
'use client'
export const EditorStoreContext = createContext<EditorStoreApi | undefined>(undefined)

export const EditorStoreProvider = ({ children, initialState }: EditorStoreProviderProps) => {
    const storeRef = useRef<EditorStoreApi | null>(null)
    if (!storeRef.current) storeRef.current = createEditorStore(initialState)
    return <EditorStoreContext.Provider value={storeRef.current}>{children}</EditorStoreContext.Provider>
}

export const useEditor = () => {
    const store = useContext(EditorStoreContext)
    if (!store) throw new Error('useEditor must be used within a EditorStoreProvider')
    return useStore(store)
}
```

`index.ts` — expõe só `useEditor`, `EditorStoreProvider`, `defaultEditorState`.

---

## A.9. Provedores do módulo — `providers/`

`providers.tsx`:
```tsx
export function EditorProviders({ children }: EditorProvidersProps) {
    return <SWREditorConfig>{children}</SWREditorConfig>
}
```

`SWREditorConfig/SWREditorConfig.tsx` — política global de SWR: qualquer resposta com `error` vira um toast:
```tsx
'use client'
export function SWREditorConfig({ children }: SWREditorConfigProps) {
    return (
        <SWRConfig value={{ onSuccess: data => {
            if ('error' in data) addToast({ title: 'Oops! Algo de errado aconteceu.', description: data.error, color: 'danger' })
        }}}>
            {children}
        </SWRConfig>
    )
}
```

---

## A.10. Components — `atoms/`

Primitivos burros, dirigidos por props, **sem `.hook`**. Cada um: `Nome.tsx` + (`Nome.types.ts`) + `index.ts`. Catálogo:

| Atom | Papel | Tem types? |
|---|---|---|
| `AddButton` | Botão "+" (estende `ButtonProps`). | sim (`= ButtonProps`) |
| `ImageButton` | Miniatura clicável com nome e estado `selected`. | sim |
| `ComponentItem` | Card de um bloco no menu (lê ícone/label do registro `sets`). | sim |
| `ComponentsWrapper` | Contêiner que arruma a gaveta de componentes do Puck. | sim |
| `FieldsWrapper` | Contêiner que zera paddings dos campos do Puck. | sim |
| `MenuTitle` | Título de menu (`<h2>`). | sim |
| `PropertyContainer` | Bloco padrão de propriedade (label + filhos + bordas). | sim |
| `PropertyTitle` | Título dentro de um `PropertyContainer`. | sim |

Exemplo — `PropertyContainer` (reusado por todos os campos):
```tsx
export function PropertyContainer({ label, children }: PropertyContainerProps) {
    return (
        <div className="w-full p-[18px] border-y-[1px] border-solid border-[#f4f4f5]">
            <div className="flex flex-col gap-[10px]">
                {label && <label className="text-[#52525B] font-medium text-[14px] leading-[110%]">{label}</label>}
                {children}
            </div>
        </div>
    )
}
```

Exemplo — `ComponentItem` lê do **registro** `sets` (desacoplado dos blocos concretos):
```tsx
export function ComponentItem({ name }: ComponentItemProps) {
    return (
        <div className="h-[80px] ...">
            {sets[name]?.icon}
            <p className="...">{sets[name]?.label ?? name}</p>
        </div>
    )
}
```

`atoms/index.ts` re-exporta todos: `export * from './AddButton'` … etc.

---

## A.11. Components — `molecules/`

Pequenas composições; as que têm comportamento trazem `.hook`. Exemplos de cada padrão:

**Com `.hook` (View burra + lógica isolada)** — `PublishButton`:
```tsx
// PublishButton.tsx (View)
'use client'
export function PublishButton() {
    const { pageId, handlePublish, isLoading } = usePublishButton()
    return (
        <Button isLoading={isLoading} onPress={handlePublish} className="...">
            <CloudUpload /> {pageId ? 'Atualizar' : 'Publicar'}
        </Button>
    )
}
```
```ts
// PublishButton.hook.ts (regra)
export function usePublishButton() {
    const { appState } = usePuck()
    const { publishedData, setPublishedData } = useEditor()
    const [isLoading, setIsLoading] = useState(false)
    const pageId = publishedData?._id
    const handlePublish = useCallback(async () => {
        setIsLoading(true)
        createOrUpdatePage({ id: pageId, data: appState.data, setPublishedData })
            .finally(() => setIsLoading(false))
    }, [appState.data, pageId, setPublishedData])
    return { pageId, handlePublish, isLoading }
}
```

**Hook que retorna JSX → arquivo `.hook.tsx`** — `PageStatus` (o hook calcula `isDraft` e devolve os badges prontos como JSX):
```tsx
// PageStatus.hook.tsx (trecho)
export function usePageStatus() {
    const { appState } = usePuck()
    const { publishedData } = useEditor()
    const isDraft = useMemo(() => /* compara content publicado x atual com lodash.isEqual */ , [...])
    const pageName = useMemo(() => appState?.data?.root?.props?.title || 'Sem título', [...])
    const status = {
        published: <span className="text-[#17C964] ...">Publicado <Check .../></span>,
        draft:     <span className="text-[#FF9800] ...">Rascunho <CircleDashed .../></span>,
    }
    return { isDraft, status, pageName }
}
```

**Índice com `dynamic` (SSR off)** — `PageStatus/index.tsx`:
```tsx
export const PageStatus = dynamic(() => import('./PageStatus').then(m => m.PageStatus), {
    loading: () => <div className="flex-1" />, ssr: false,
})
```

**Lógica que despacha no motor** — `ViewportButtons.hook.ts` (muda o viewport do Puck via `dispatch`). **Sem `.types` próprio** (props inline) — exemplo de que arquivos de tipo só existem quando há tipo a declarar.

**Molecule de motor puro** — `ViewportStyledInjection` injeta o `StyleSheetManager` de styled no `target` do iframe do Puck.

**Molecule sem comportamento** — `DeleteButton` (botão estático/`isDisabled`, placeholder).

---

## A.12. Components — `organisms/`

Compõem molecules/atoms e orquestram regiões da tela. Vários usam o padrão **"componente dinâmico via store"**: o `.hook` escolhe *qual* sub-UI renderizar e a View só a posiciona.

`Header` — barra superior; compõe `PageStatus`, `ViewportButtons`, `PublishButton`; expõe `headerHeight` (constante re-exportada no índice).

`MenusSidebar` — escolhe o menu ativo a partir da store e do **namespace** de menus:
```tsx
// MenusSidebar.hook.tsx
export function useMenusSidebar() {
    const { selectedMenu } = useEditor()
    const Menu = useMemo(() => selectedMenu?.menu ? menusModules[selectedMenu.menu] : () => <></>, [selectedMenu])
    return { Menu }
}
// MenusSidebar.tsx posiciona <MenuSelector/> + <Menu/>
```

`PropertiesSidebar` — mesma ideia para o painel direito, com regra extra: se há um componente selecionado no canvas, mostra `ComponentsProperties`; senão, o painel do menu atual; e reseta a seleção quando o menu muda:
```tsx
// PropertiesSidebar.hook.tsx
const Properties = useMemo(() => {
    if (componentIsSelected) return propertiesModules.ComponentsProperties
    return selectedMenu?.properties ? propertiesModules[selectedMenu.properties] : () => <></>
}, [componentIsSelected, selectedMenu])
useEffect(() => { dispatch({ type: 'setUi', ui: { itemSelector: null, field: { focus: null } } }) }, [dispatch, selectedMenu])
```

`Preview` — canvas central; o `.hook` calcula escala/altura para encaixar o viewport escolhido no espaço disponível (com listener de `resize`); a View aplica `transform: scale(...)`. Índice carrega via `dynamic` (`ssr:false`).

---

## A.13. Components — `pages/` (o split Server/Client)

`EditorPage` — **Server Component** que busca dados, trata erro com `redirect`, monta provedores e **semeia a store**:
```tsx
// EditorPage.tsx (server)
export async function EditorPage({ id }: EditorPageProps) {
    let initialData
    try {
        if (id) {
            initialData = await getPageById(id)
            if ('error' in initialData || !initialData?.payload?._id) throw new Error('Página não encontrada')
        }
    } catch { redirect('/admin/editor') }

    return (
        <EditorProviders>
            <EditorStoreProvider initialState={{ ...defaultEditorState, publishedData: initialData?.payload ?? null }}>
                <EditorPageClient initialPage={initialData?.payload} />
            </EditorStoreProvider>
        </EditorProviders>
    )
}
```
```tsx
// EditorPage.client.tsx (client) — monta o Puck e os organisms
'use client'
export function EditorPageClient({ initialPage }: EditorPageClientProps) {
    return (
        <Puck config={config} data={initialPage?.content ?? {}} plugins={plugins} ui={uiConfig} viewports={viewports}>
            <main className="flex flex-col h-[100vh] ...">
                <Header />
                <div className="flex justify-between flex-1 ..." style={{ maxHeight: `calc(100vh - ${headerHeight}px)` }}>
                    <MenusSidebar /><Preview /><PropertiesSidebar />
                </div>
            </main>
        </Puck>
    )
}
```
```ts
// EditorPage.types.ts — tipos do par server/client
export interface EditorPageProps { id?: string }
export interface EditorPageClientProps extends EditorPageProps { initialPage?: IPage }
```

`RenderPage` — split análogo para a página pública; o client só pede ao Puck para **renderizar** o conteúdo salvo com o mesmo `config`:
```tsx
// RenderPage.client.tsx
'use client'
export function RenderPageClient({ page }: RenderPageProps) {
    return <Render config={config} data={page.content} />
}
```

> Detalhe importante: o **mesmo** `config` (de `editor.config.tsx`) alimenta tanto a edição (`<Puck>`) quanto a renderização pública (`<Render>`). Garante paridade visual entre editor e site.

---

## A.14. `fields/` — campos customizados do editor

Coleção especializada (mesma anatomia de componente). Base de tipos compartilhada:
```ts
// fields.types.ts
export interface FieldProps { label?: string; validator?: BaseField['validator'] }
```

Padrão de cada campo: `'use client'`, envolve em `PropertyContainer`, roda o `validator` e mostra `isInvalid`/`errorMessage`.

`FieldText` (estende `InputProps`):
```tsx
export function FieldText({ label = 'Texto', validator, value, ...props }: FieldTextProps) {
    const error = validator?.(value)
    return (
        <PropertyContainer label={label}>
            <Input {...props} value={value} type="text" isInvalid={error?.valid === false} errorMessage={error?.message} />
        </PropertyContainer>
    )
}
```

`FieldNumber` (estende `NumberInputProps`; força inteiros via `formatOptions`).
`FieldSelect` — tem `.hook` próprio que filtra a seleção e roda o validator.

`FieldFiles` — **o exemplo canônico de `subcomponents/`**: gerencia uma lista de arquivos com limite, e delega cada item ao subcomponente `FileRow`:
```tsx
// FieldFiles.tsx (trecho)
export function FieldFiles({ label='Arquivos', files, onValueChange, allowedExtensions, limit=9 }: FieldFilesProps) {
    const { inputRef, addFile, handleOnClick } = useFieldFiles({ onValueChange })
    return (
        <PropertyContainer label={label}>
            <input ref={inputRef} type="file" accept={allowedExtensions} className="hidden" onChange={addFile} onClick={handleOnClick} />
            {files.length < limit && <Button onPress={() => inputRef.current?.click()}><Plus/></Button>}
            {files.map((file, index) => (
                <FileRow key={file.name + index} file={file} index={index} allowedExtensions={allowedExtensions} onValueChange={onValueChange} />
            ))}
        </PropertyContainer>
    )
}
```
```
FieldFiles/
├── FieldFiles.tsx / .hook.ts / .types.ts / index.ts
└── subcomponents/
    ├── index.ts                      # export * from './FileRow'
    └── FileRow/
        ├── FileRow.tsx               # baixar / remover / substituir um arquivo
        ├── FileRow.hook.ts           # replaceFile / deleteFile (manipula a lista por índice)
        ├── FileRow.types.ts          # importa OnValueChangeType e FieldFilesCommonProps de ../../FieldFiles.types
        └── index.ts
```
`FileRow.types.ts` mostra o **reuso de tipos do pai** (§5):
```ts
import { FieldFilesCommonProps, OnValueChangeType } from '../../FieldFiles.types'
export interface FileRowHookProps { index: number; onValueChange?: OnValueChangeType }
export interface FileRowProps extends FieldFilesCommonProps { file: File; index: number }
```

---

## A.15. `menus/` — menus da sidebar (ciclo de vida completo)

`PagesMenu` é o exemplo mais completo de uma unidade que **busca dados**, com os 4 estados separados em arquivos:

```
PagesMenu/
├── PagesMenu.tsx          # View; usa o hook; renderiza <PagesMenuLoading/> enquanto carrega
├── PagesMenu.hook.tsx     # SWR(getPages) + navegação; "throw data" se vier erro
├── PagesMenu.loading.tsx  # skeleton
├── PagesMenu.error.tsx    # alerta de erro
└── index.ts               # dynamic(ssr:false) + withErrorBoundary(fallback=Error, loading=Loading)
```
```ts
// PagesMenu.hook.tsx
export function usePagesMenu() {
    const router = useRouter()
    const { publishedData } = useEditor()
    const { data, isLoading } = useSWR(['getPages', publishedData], getPages)
    if (data && 'error' in data) throw data               // erro sobe para o errorBoundary do index
    const handleSelectPage = useCallback((pageId: string) => router.push(`/admin/editor/${pageId}`), [router])
    return { pages: data?.payload ?? [], pageId: publishedData?._id, handleSelectPage, isLoading }
}
```
```ts
// index.ts — toda a fiação de borda fica aqui, fora da View
export const PagesMenu = withErrorBoundary(
    dynamic(() => import('./PagesMenu').then(m => m.PagesMenu), { loading: PagesMenuLoading, ssr: false }),
    { fallbackRender: PagesMenuError },
)
```

`ComponentsMenu` e `OutlineMenu` são finos: só embrulham componentes do próprio motor (`<Puck.Components/>`, `<Puck.Outline/>`) com `MenuTitle` + classes utilitárias.

`GalleryMenu` e `TypographyMenu` são **placeholders de features desativadas** (`disabled:true` em `editor.constants`). Eles usam estado com dados *mockados* direto na View — **a única exceção** à regra "View sem estado". São telas ainda não implementadas no padrão; servem de aviso de que o padrão-alvo (extrair para `.hook`) ainda não foi aplicado nelas.

---

## A.16. `properties/` — painéis de propriedades

`ComponentsProperties` — exibido quando há um bloco selecionado; usa `subcomponents/`:
```
ComponentsProperties/
├── ComponentsProperties.tsx / .hook.ts / index.ts
└── subcomponents/
    ├── index.ts
    ├── ComponentOverview/        # cabeçalho + <Puck.Fields/>
    └── PropertyComponentHeader/  # breadcrumb da hierarquia + nome do componente (.hook.ts calcula a hierarquia lendo o registro `sets`)
```
```tsx
// ComponentsProperties.tsx
export function ComponentsProperties() {
    const { haveComponentSelected } = useComponentProperties()   // = appState.ui.itemSelector
    return <div className="properties-wrapper">{haveComponentSelected && <ComponentOverview />}</div>
}
```

`PagesProperties` — edita o root da página: `<Puck.Fields/>` (title/slug) + `DeleteButton`.
`GalleryProperties` / `TypographyProperties` — placeholders (mock + estado na View), como os menus correspondentes.

---

## A.17. `services/` — caso de uso da feature

`createOrUpdatePage` — orquestra o Controller, valida o payload, trata o envelope, dá feedback e atualiza a store. Não conhece persistência:
```ts
export async function createOrUpdatePage({ id, data, setPublishedData }: CreateOrUpdatePageProps) {
    const mutationType = id ? 'update' : 'create'
    const mutations = {
        update: { action: updatePage, feedback: 'Página atualizada com sucesso', message: '...' },
        create: { action: createPage, feedback: 'Página criada com sucesso',     message: '...' },
    }
    const root = data.root as Data['root'] & { props: IPage }
    const payload: IPage = { title: root.props?.title, slug: root.props?.slug, content: data }

    if (!pageSchema?.safeParse(payload).success) {
        const error = pageSchema?.safeParse(payload).error?.issues[0]
        addToast({ title: 'Há problemas com os seus campos', description: error?.message, color: 'warning' })
        return
    }
    try {
        const page = await mutations[mutationType].action({ _id: id, ...payload })
        if ('error' in page) throw new Error(page.error)
        setPublishedData(page.payload)
        addToast({ title: mutations[mutationType].feedback, description: mutations[mutationType].message, color: 'success' })
        return page
    } catch (error) {
        addToast({ title: 'Erro ao criar ou atualizar página', description: error instanceof Error ? error.message : '', color: 'danger' })
    }
}
```

---

## A.18. `sets/` — biblioteca de blocos (config-driven)

Cada bloco é uma unidade com `Component.tsx` + `Component.fields.ts` (+ `.styles`) + `index.tsx` que registra via `setupComponent`.

`Typography` (estilo via styled + props transientes):
```tsx
// Typography.tsx
export function Typography({ text, size, weight, tag, align, padding }: TypographyProps) {
    return <StyledTypography $size={size} $weight={weight} $align={align} $padding={padding} as={tag}>{text}</StyledTypography>
}
// Typography.styles.ts → styled.p<{ $size; $weight; $align; $padding }>` ... `
```
```ts
// Typography.fields.ts → interface TypographyProps + fields (Puck, labels pt-BR) + defaultProps
export const defaultProps: TypographyProps = { text:'Texto', size:'16px', weight:'normal', tag:'p', align:'left', padding:'32px' }
```
```tsx
// Typography/index.tsx → registra o bloco
export const typography = setupComponent({
    component: Typography,
    config: { label: 'Tipografia', fields, defaultProps },
    icon: <Text />,
})
```

`Flex` e `Wrapper` usam `DropZone` do Puck para **aninhar** outros blocos (`Flex` é um container flex configurável; `Wrapper` centraliza com largura máxima).

Agregação em registro único:
```ts
// sets/generic/components/index.ts → export * from './Wrapper' / './Flex' / './Typography'
// sets/generic/index.ts            → export * from './components'
// sets/index.ts:
export const sets = setupSets({ sets: { genericSet } })   // funde tudo num { [type]: ComponentConfig }
```

---

## A.19. `shared/` — transversal

`tools/setupComponent/setupComponent.tsx` (fábrica; JSDoc presente por ser genérica):
```tsx
export function setupComponent<T extends DefaultComponentProps>({ component, config, icon = <Component /> }: {
    component: PuckComponent<T>
    config: Omit<ComponentConfig<T>, 'render'> & { label: string }
    icon?: ReactNode
}): ComponentConfig<T> & { icon: ReactNode } {
    return { ...config, render: component, icon }
}
```

`tools/setupSets/setupSets.ts` (agregador de registro): funde vários conjuntos nomeados em um só mapa.

`tools/fieldValidator/fieldValidator.ts` (adaptador Zod → validador do motor):
```ts
export const fieldValidator = <T>(schema: z.ZodSchema): BaseField['validator'] =>
    (value: T) => {
        const result = schema.safeParse(value)
        return { message: result.error?.issues[0].message || '', valid: result.success }
    }
```

`hooks/useServerAction/useServerAction.tsx` (hook utilitário genérico: roda uma server action e guarda o resultado em estado).

---

## A.20. Estilo e qualidade

`core/assets/admin.global.css` — Tailwind + classes utilitárias próprias em `@layer utilities`, reusadas por menus/painéis: `.menu-wrapper`, `.properties-wrapper`, `.scrollable-wrapper` (+ estilização de scrollbar global).

`tailwind.config.js` — paleta `primary` (verde `#00CE8B` e variações), fonte `poppins` via CSS var, `darkMode: 'class'`, plugin `heroui()`.

Ferramentas que **garantem o padrão mecanicamente**:
- **Prettier**: `semi:false`, `singleQuote:true`, `tabWidth:4`, `arrowParens:'avoid'`, `quoteProps:'consistent'`.
- **EditorConfig**: LF, `insert_final_newline`, UTF-8, 4 espaços.
- **ESLint**: `next/core-web-vitals` + `next/typescript` + `prettier`; `react/display-name:off`; `naming-convention` (typeLike PascalCase, typeParameter PascalCase com prefixo `T`, interface PascalCase).
- **tsconfig**: `strict`, alias `@/* → ./src/*`.

---

## A.21. Fluxos end-to-end

**Renderização pública**
```
GET /<slug>
 └─ app/[...slug]/page.tsx          (entrada fina)
     └─ getPageBySlug(slug)          (Controller, 'use server')
         └─ getPageBySlugModel       (Model via typeSwitcher)
             └─ standalone|api        (impl escolhida por env)
                 └─ MongoDB|API
     ← BaseResponse<IPage> | BaseError
 └─ 'error' in data → notFound()
 └─ <RenderPage page> → <Render config data={content}>   (Puck renderiza os blocos salvos)
```

**Carregar o editor**
```
GET /admin/editor/[id?]
 └─ page.tsx → <EditorPage id>                 (server)
     └─ getPageById(id) (se houver id)          (Controller → Model → impl)
     └─ <EditorProviders>                        (SWR config)
         └─ <EditorStoreProvider initialState={publishedData}>   (store semeada do servidor)
             └─ <EditorPageClient>               (client)
                 └─ <Puck config plugins ui viewports>
                     └─ <Header/> <MenusSidebar/> <Preview/> <PropertiesSidebar/>
```

**Publicar / atualizar**
```
clique em PublishButton
 └─ usePublishButton().handlePublish           (.hook da molecule)
     └─ createOrUpdatePage({ id, data, setPublishedData })   (service da feature)
         ├─ valida payload com pageSchema (Zod)  → toast 'warning' se inválido
         └─ create|updatePage(...)               (Controller 'use server')
             └─ Model → impl → DB
         ├─ 'error' in page → toast 'danger'
         └─ sucesso → setPublishedData(payload) + toast 'success'
```

**Trocar viewport** → `ViewportButtons.hook` faz `dispatch({type:'setUi', ...})` no Puck → `Preview.hook` recalcula `scale`/`height` → canvas re-escala.

**Selecionar um bloco no canvas** → `appState.ui.itemSelector` muda → `PropertiesSidebar.hook` passa a renderizar `ComponentsProperties` → `PropertyComponentHeader.hook` monta o breadcrumb lendo `sets`.

---

## A.22. Mapa: invariante (§1) → realização no CMS

| Invariante (§1) | Onde se realiza no CMS |
|---|---|
| 1. Legibilidade sem comentários | Views só compõem JSX; lógica nos `.hook`; comentários só nos `tools` (JSDoc). |
| 2. Uma responsabilidade = um arquivo | Sufixos `.tsx/.hook/.types/.styles/.fields/.client/.loading/.error/.constants/.context`. |
| 3. Apresentação ≠ comportamento | `PublishButton.tsx` × `PublishButton.hook.ts`; toda molecule/organism com regra. |
| 4. Co-location | Cada componente em pasta própria com tudo ao lado. |
| 5. Localidade de reuso | `FieldFiles/subcomponents/FileRow`; `ComponentsProperties/subcomponents/*`. |
| 6. Composição em níveis | `components/{atoms,molecules,organisms,pages}`. |
| 7. Fatiamento por feature | `modules/editor/*` autocontido. |
| 8. Direção única de dependência | `core` não importa `modules`/`sets`; `shared` não importa `modules` (verificável por grep). |
| 9. MVC na camada de dados | `models` (forma+persistência) / `controllers` (borda) / componentes (view). |
| 10. Bordas normalizadas | `BaseResponse|BaseError`; `pages.errors.ts`; validação Zod no Controller. |
| 11. Inversão de dependência | `IPageModels` + `standalone`/`api` + `typeSwitcher`. |
| 12. Bordas finas | `app/**/page.tsx` só parseiam e delegam. |

> **Conclusão do estudo de caso:** nenhuma das escolhas acima (Puck, Mongo, Zustand, SWR, HeroUI…) é exigida pela arquitetura. Trocar qualquer uma significa reimplementar o *slot* correspondente (§18) mantendo a mesma interface — Views, Controllers e o desenho de pastas permanecem idênticos. É exatamente isso que torna a arquitetura reaproveitável para **qualquer aplicação, com qualquer stack e qualquer banco**.
