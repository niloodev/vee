use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let migrations = vec![
    Migration {
      version: 1,
      description: "create_account_table",
      sql: "CREATE TABLE IF NOT EXISTS account (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      username TEXT NOT NULL,
      displayName TEXT NOT NULL,
      avatar TEXT NOT NULL DEFAULT '',
      mcpEnabled INTEGER NOT NULL DEFAULT 0,
      mcpKey TEXT NOT NULL DEFAULT ''
    );",
      kind: MigrationKind::Up,
    },
    Migration {
      version: 2,
      description: "create_items_table",
      sql: "CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        domain TEXT NOT NULL,
        title TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 0,
        year INTEGER,
        genres TEXT NOT NULL DEFAULT '[]',
        notes TEXT NOT NULL DEFAULT '',
        cover TEXT NOT NULL DEFAULT '',
        type TEXT,
        status TEXT,
        value INTEGER,
        total INTEGER,
        unit TEXT,
        epMinute INTEGER,
        epDuration INTEGER,
        subtitle TEXT,
        synopsis TEXT,
        gameType TEXT,
        platform TEXT,
        developer TEXT,
        publisher TEXT,
        playtime INTEGER,
        lastPlayed TEXT,
        installSize INTEGER,
        installDir TEXT,
        launcher TEXT,
        icon TEXT,
        description TEXT,
        prevStatus TEXT,
        createdAt TEXT,
        updatedAt TEXT
      );",
      kind: MigrationKind::Up,
    },
    Migration {
      version: 3,
      description: "add_account_accent_colors",
      sql: "ALTER TABLE account ADD COLUMN mediaColor TEXT NOT NULL DEFAULT '';
            ALTER TABLE account ADD COLUMN gamesColor TEXT NOT NULL DEFAULT '';",
      kind: MigrationKind::Up,
    },
  ];

  tauri::Builder::default()
    .plugin(
      tauri_plugin_sql::Builder::default()
        .add_migrations("sqlite:vee.db", migrations)
        .build(),
    )
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
