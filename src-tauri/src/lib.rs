use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  let migrations = vec![Migration {
    version: 1,
    description: "create_account_table",
    sql: "CREATE TABLE IF NOT EXISTS account (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      username TEXT NOT NULL,
      displayName TEXT NOT NULL,
      avatar TEXT NOT NULL DEFAULT '',
      defaultGameDir TEXT NOT NULL DEFAULT '',
      defaultRomDir TEXT NOT NULL DEFAULT '',
      defaultEmulator TEXT NOT NULL DEFAULT '',
      mcpEnabled INTEGER NOT NULL DEFAULT 0,
      mcpKey TEXT NOT NULL DEFAULT ''
    );",
    kind: MigrationKind::Up,
  }];

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
