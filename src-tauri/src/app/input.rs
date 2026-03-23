use evdev::{Device, EventSummary, KeyCode};
use std::thread;
use tauri::{AppHandle, Emitter};

fn es_teclado(dev: &Device) -> bool {
    dev.supported_keys()
        .map(|keys| keys.contains(KeyCode::KEY_A))
        .unwrap_or(false)
}

pub fn iniciar_captura(app: AppHandle) {
    thread::spawn(move || {
        let dispositivos: Vec<Device> = evdev::enumerate()
            .map(|(_, d)| d)
            .filter(|d| es_teclado(d))
            .collect();

        for mut dev in dispositivos {
            let app = app.clone();
            thread::spawn(move || loop {
                match dev.fetch_events() {
                    Ok(events) => {
                        for ev in events {
                            match ev.destructure() {
                                EventSummary::Key(_, key, 1) => {
                                    let nombre = format!("{:?}", key);
                                    app.emit("key-event", nombre).unwrap();
                                }
                                _ => {}
                            }
                        }
                    }
                    Err(_) => {
                        thread::sleep(std::time::Duration::from_millis(10));
                    }
                }
            });
        }
    });
}
