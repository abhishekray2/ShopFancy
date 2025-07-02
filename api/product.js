// products.js

export const products = [
  {
    "id": 1,
    "name": "MacBook Pro 16-inch",
    "brand": "Apple",
    "category": "Computers",
    "description": "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro chip — the first Apple silicon designed for pros — you get groundbreaking performance and amazing battery life.",
    "price": 199999,
    "stock": 10,
    "image": "https://github.com/abhishekray2/ShopFancy/blob/main/public/images/laptop.png",
    "model": "MXQT2LL/A",
    "processor": "Apple M1 Pro chip",
    "ram": "16GB unified memory",
    "storage": "512GB SSD",
    "graphics": "16-core GPU",
    "display": "16-inch Liquid Retina XDR display",
    "os": "macOS Monterey",
    "weight": "2.1 kg",
    "dimensions": "35.57 x 24.81 x 1.68 cm",
    "color": "Space Gray",
    "manufacturer": "Apple Inc.",
    "origin": "China",
    "releaseDate": "2023",
    "inTheBox": "MacBook Pro, 96W USB-C Power Adapter, USB-C Charge Cable"
  },
  {
    "id": 2,
    "name": "iPhone 14 Pro",
    "brand": "Apple",
    "category": "Mobiles",
    "description": "The iPhone 14 Pro takes the iPhone's most advanced dual-camera system and adds a third telephoto camera, delivering a pro-level photography experience.",
    "price": 129999,
    "stock": 15,
    "image": "https://github.com/abhishekray2/ShopFancy/blob/main/public/images/iphone.png",
    "model": "A2650",
    "processor": "A16 Bionic chip",
    "ram": "6GB",
    "storage": "256GB",
    "display": "6.1-inch Super Retina XDR display",
    "camera": "48MP Main + 12MP Ultra Wide + 12MP Telephoto",
    "battery": "3200mAh",
    "weight": "206g",
    "dimensions": "147.5 x 71.5 x 7.85 mm",
    "color": "Deep Purple",
    "manufacturer": "Apple Inc.",
    "origin": "India",
    "releaseDate": "2023",
    "inTheBox": "iPhone with iOS 16, USB-C to Lightning Cable, Documentation"
  },
  {
    "id": 3,
    "name": "Sony WH-1000XM4",
    "brand": "Sony",
    "category": "Audio",
    "description": "Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo.",
    "price": 29999,
    "stock": 20,
    "image": "https://github.com/abhishekray2/ShopFancy/blob/main/public/images/headphone.png",
    "model": "WH-1000XM4",
    "driverSize": "40mm",
    "frequency": "4Hz-40,000Hz",
    "connectivity": "Bluetooth 5.0, NFC",
    "batteryLife": "Up to 30 hours",
    "weight": "254g",
    "color": "Black",
    "manufacturer": "Sony Corporation",
    "origin": "Malaysia",
    "releaseDate": "2023",
    "inTheBox": "Headphones, Carrying Case, USB-C Cable, Audio Cable"
  },
  {
    "id": 4,
    "name": "Apple Watch Series 8",
    "brand": "Apple",
    "category": "Wearables",
    "description": "The most advanced Apple Watch yet with temperature sensing, blood oxygen monitoring, and an Always-On Retina display.",
    "price": 45999,
    "stock": 8,
    "image": "https://github.com/abhishekray2/ShopFancy/blob/main/public/images/watch.png",
    "model": "GPS + Cellular",
    "display": "Always-On Retina LTPO OLED display",
    "batteryLife": "Up to 18 hours",
    "sensors": "Temperature, Blood Oxygen, ECG, Heart Rate",
    "compatibility": "iOS 16 or later",
    "weight": "38.8g",
    "waterResistance": "50 meters",
    "color": "Midnight",
    "manufacturer": "Apple Inc.",
    "origin": "China",
    "releaseDate": "2023",
    "inTheBox": "Apple Watch, Sport Band, Magnetic Charging Cable"
  },
  {
    "id": 5,
    "name": "Speakers",
    "category": "Audio",
    "brand": "SoundBeats",
    "price": 149.99,
    "stock": 30,
    "description": "Premium portable speaker with immersive 360° sound and robust build quality.",
    "image": "https://github.com/abhishekray2/ShopFancy/blob/main/public/images/speakers.png",
    "details": {
      "audio": {
        "output_power": "30W RMS",
        "frequency_response": "45Hz - 20kHz",
        "drivers": "2 x 2.5\" woofers, 2 x 1\" tweeters",
        "passive_radiators": "2 x passive bass radiators"
      },
      "sound_features": {
        "sound_modes": [
          "Indoor",
          "Outdoor",
          "Party mode",
          "Custom EQ"
        ],
        "stereo_pairing": "Yes",
        "multi_room": "Yes"
      },
      "battery": {
        "capacity": "5200mAh",
        "playback_time": "20 hours at moderate volume",
        "charging_time": "4 hours",
        "power_bank": "Can charge mobile devices"
      },
      "connectivity": {
        "bluetooth": "5.0 with aptX",
        "range": "30 meters",
        "aux_input": "3.5mm",
        "usb": "Type-C for charging"
      },
      "durability": {
        "water_resistance": "IPX7",
        "dust_resistance": "IP6X",
        "impact_resistance": "Drop-tested from 1.5m"
      },
      "physical": {
        "dimensions": "220 x 95 x 93 mm",
        "weight": "700 grams",
        "materials": "Rugged fabric and silicone"
      },
      "features": [
        "Built-in microphone for calls",
        "Voice assistant integration",
        "Party lights with multiple modes",
        "Companion app for customization"
      ],
      "in_box": [
        "Speaker",
        "USB-C charging cable",
        "Quick start guide",
        "Carrying strap"
      ],
      "warranty": "2 years manufacturer warranty"
    }
  },
  {
    "id": 6,
    "name": "Television",
    "category": "Video",
    "brand": "Samsung",
    "price": 199.99,
    "stock": 20,
    "description": "42-inch 4K Smart TV with cutting-edge display technology and immersive audio.",
    "image": "https://github.com/abhishekray2/ShopFancy/blob/main/public/images/tv.png",
    "details": {
      "display": {
        "size": "42 inches",
        "resolution": "4K UHD (3840 x 2160)",
        "panel_type": "LED",
        "refresh_rate": "120Hz",
        "hdr": [
          "HDR10+",
          "HLG",
          "Dolby Vision"
        ]
      },
      "picture_quality": {
        "processor": "Crystal 4K",
        "dimming": "Micro Dimming Pro",
        "color": "Dynamic Crystal Color",
        "viewing_angle": "178 degrees"
      },
      "audio": {
        "output": "20W (2.0 CH)",
        "sound_system": "Dolby Digital Plus",
        "features": [
          "Q-Symphony",
          "Adaptive Sound",
          "Bluetooth Audio"
        ]
      },
      "smart_features": {
        "os": "Tizen",
        "voice_assistants": [
          "Bixby",
          "Alexa",
          "Google Assistant"
        ],
        "apps": "Netflix, Prime Video, Disney+, etc.",
        "screen_mirroring": "Apple AirPlay 2, Tap View"
      },
      "connectivity": {
        "hdmi": "3 x HDMI 2.1",
        "usb": "2 x USB 2.0",
        "wifi": "Wi-Fi 5",
        "bluetooth": "5.0",
        "ethernet": "Yes"
      },
      "design": {
        "bezel": "3-side borderless",
        "thickness": "25.7mm",
        "weight": "8.9kg (without stand)",
        "vesa_mount": "200 x 200"
      },
      "power": {
        "consumption": "120W typical",
        "energy_rating": "Energy Star certified",
        "standby": "<0.5W"
      },
      "additional_features": [
        "Game Mode",
        "Ambient Mode",
        "Multi View",
        "Mobile to TV mirroring"
      ],
      "warranty": "1 year manufacturer warranty"
    }
  },
  {
    "id": 7,
    "name": "Tablet",
    "category": "Computers",
    "brand": "TechPad",
    "price": 299.99,
    "stock": 60,
    "description": "Versatile tablet combining powerful performance with premium design and all-day battery life.",
    "image": "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=800&h=600&fit=crop",
    "details": {
      "display": {
        "size": "10.5-inch",
        "type": "IPS LCD",
        "resolution": "2560 x 1600",
        "brightness": "500 nits",
        "features": [
          "TrueTone technology",
          "Anti-reflective coating",
          "120Hz refresh rate"
        ]
      },
      "performance": {
        "processor": "Octa-core 1.8GHz",
        "gpu": "Integrated graphics",
        "ram": "4GB LPDDR4X",
        "storage": "64GB (expandable up to 1TB)"
      },
      "camera": {
        "rear": "13MP with autofocus",
        "front": "8MP ultra-wide",
        "features": [
          "4K video recording",
          "Document scanner",
          "AR support"
        ]
      },
      "battery": {
        "capacity": "7040mAh",
        "life": "Up to 12 hours",
        "charging": "18W fast charging"
      },
      "audio": {
        "speakers": "Quad speakers",
        "microphones": "Dual array",
        "jack": "3.5mm headphone"
      },
      "connectivity": {
        "wifi": "Wi-Fi 6",
        "bluetooth": "5.0",
        "usb": "USB-C 3.1"
      },
      "security": [
        "Fingerprint sensor",
        "Face unlock",
        "Security folder"
      ],
      "dimensions": "247.6 x 178.5 x 6.1 mm",
      "weight": "465g",
      "accessories_support": [
        "Smart keyboard compatible",
        "Stylus support",
        "Protective cases"
      ],
      "warranty": "1 year manufacturer warranty"
    }
  },
  {
    "id": 8,
    "name": "Smart Home Camera",
    "category": "Smart Devices",
    "brand": "HomeGuard",
    "price": 129.99,
    "stock": 80,
    "description": "Advanced security camera with AI-powered detection and crystal-clear night vision.",
    "image": "https://images.unsplash.com/photo-1558000143-a78f8299c40b?w=800&h=600&fit=crop",
    "details": {
      "camera": {
        "resolution": "1080p Full HD",
        "lens": "130° wide-angle",
        "sensor": "1/2.7\" CMOS",
        "night_vision": "IR LEDs up to 30ft"
      },
      "video": {
        "compression": "H.265",
        "fps": "30fps",
        "hdr": "WDR up to 120dB",
        "zoom": "8x digital zoom"
      },
      "smart_features": {
        "detection": [
          "Person detection",
          "Package detection",
          "Pet detection",
          "Vehicle detection"
        ],
        "alerts": "Customizable push notifications",
        "zones": "Activity zones configuration"
      },
      "audio": {
        "microphone": "Noise-canceling",
        "speaker": "Built-in speaker",
        "two_way_audio": "Full-duplex"
      },
      "storage": {
        "local": "microSD up to 128GB",
        "cloud": "7-day free rolling storage",
        "encryption": "AES 256-bit"
      },
      "connectivity": {
        "wifi": "2.4GHz/5GHz",
        "ethernet": "RJ45 port",
        "protocols": "RTSP support"
      },
      "power": {
        "input": "5V/2A",
        "consumption": "<5W",
        "backup": "Built-in battery backup"
      },
      "physical": {
        "dimensions": "70 x 70 x 110mm",
        "weight": "200g",
        "mounting": "Wall/ceiling mount included"
      },
      "environmental": {
        "operating_temp": "-10°C to 45°C",
        "water_resistance": "IP65",
        "certification": "FCC, CE, RoHS"
      },
      "warranty": "2 years manufacturer warranty"
    }
  },
  {
    "id": 9,
    "name": "Electric Kettle",
    "category": "Home Appliances",
    "brand": "SmartKettle",
    "price": 49.99,
    "stock": 150,
    "description": "Smart electric kettle with precise temperature control and rapid boiling technology.",
    "image": "https://images.unsplash.com/photo-1594213114663-d94db9b17125?w=800&h=600&fit=crop",
    "details": {
      "capacity": {
        "volume": "1.7L",
        "min_fill": "0.5L",
        "water_level": "Visible marker"
      },
      "heating": {
        "power": "1500W",
        "boiling_time": "Under 4 minutes",
        "temperature_range": "40°C - 100°C",
        "presets": [
          "Green tea (80°C)",
          "Coffee (95°C)",
          "Boil (100°C)"
        ]
      },
      "construction": {
        "body": "304 stainless steel",
        "base": "BPA-free plastic",
        "filter": "Removable scale filter",
        "lid": "Wide-opening lid"
      },
      "safety_features": [
        "Auto shut-off",
        "Boil-dry protection",
        "Cool-touch exterior",
        "Safety lid lock"
      ],
      "controls": {
        "display": "LED temperature display",
        "buttons": "Touch-sensitive",
        "keep_warm": "30-minute function"
      },
      "electrical": {
        "voltage": "220-240V",
        "frequency": "50-60Hz",
        "cord_length": "0.75m"
      },
      "dimensions": "220 x 150 x 250mm",
      "weight": "1.2kg",
      "certification": [
        "CE",
        "RoHS",
        "ERP"
      ],
      "warranty": "2 years manufacturer warranty"
    }
  },
  {
    "id": 10,
    "name": "Gaming Mouse",
    "category": "Accessories",
    "brand": "GameMaster",
    "price": 69.99,
    "stock": 120,
    "description": "Professional gaming mouse with customizable features and precision tracking.",
    "image": "https://images.unsplash.com/photo-1613141411244-0e4ac259d217?w=800&h=600&fit=crop",
    "details": {
      "sensor": {
        "type": "Optical (PMW3389)",
        "dpi": "100-16000",
        "polling_rate": "1000Hz",
        "acceleration": "50G"
      },
      "buttons": {
        "count": "6 programmable buttons",
        "switches": "Omron 50M clicks",
        "response_time": "0.2ms"
      },
      "ergonomics": {
        "grip_style": "Ergonomic right-handed",
        "weight": "120g (adjustable)",
        "dimensions": "126 x 66 x 40mm"
      },
      "customization": {
        "lighting": "16.8M RGB colors",
        "zones": "3 RGB zones",
        "profiles": "5 onboard profiles",
        "weights": "5 x 3.6g removable weights"
      },
      "connectivity": {
        "type": "Wired",
        "cable": "1.8m braided",
        "usb": "Gold-plated USB"
      },
      "software": {
        "macro_editor": "Yes",
        "rgb_sync": "Yes",
        "os_support": [
          "Windows 7+",
          "macOS 10.12+"
        ]
      },
      "materials": {
        "shell": "PBT plastic",
        "feet": "PTFE",
        "scroll_wheel": "Rubberized"
      },
      "features": [
        "On-the-fly DPI switching",
        "Angle snapping",
        "Lift-off distance adjustment",
        "Surface calibration"
      ],
      "warranty": "2 years manufacturer warranty"
    }
  },
  {
    "id": 11,
    "name": "4K Webcam",
    "category": "Accessories",
    "brand": "ClearCam",
    "price": 89.99,
    "stock": 200,
    "description": "Professional 4K webcam with advanced auto-focus and low-light correction.",
    "image": "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&h=600&fit=crop",
    "details": {
      "video": {
        "resolution": "4K UHD (3840 x 2160)",
        "frame_rate": "30fps at 4K, 60fps at 1080p",
        "fov": "90° diagonal",
        "zoom": "5x digital zoom"
      },
      "lens": {
        "type": "Glass lens with 8 elements",
        "focus": "Autofocus from 10cm to infinity",
        "aperture": "f/2.0"
      },
      "audio": {
        "microphones": "Dual omnidirectional",
        "noise_reduction": "AI-powered",
        "pickup_range": "Up to 4 meters"
      },
      "image_quality": {
        "sensor": "1/2.8\" CMOS",
        "low_light": "Enhanced low-light performance",
        "hdr": "True HDR support",
        "white_balance": "Auto and manual"
      },
      "smart_features": [
        "Face tracking",
        "Auto exposure",
        "Background replacement",
        "Privacy shutter"
      ],
      "compatibility": {
        "os": [
          "Windows 7+",
          "macOS 10.10+",
          "Chrome OS",
          "Android"
        ],
        "software": [
          "Zoom",
          "Skype",
          "Teams",
          "WebEx"
        ]
      },
      "mounting": {
        "clip": "Universal monitor clip",
        "tripod": "1/4\" thread mount",
        "adjustability": "360° rotation"
      },
      "connectivity": "USB 3.0 (backward compatible)",
      "cable_length": "2.0m",
      "dimensions": "79 x 73 x 48mm",
      "weight": "162g",
      "warranty": "2 years manufacturer warranty"
    }
  },
  {
    "id": 12,
    "name": "Bluetooth Earbuds",
    "category": "Audio",
    "brand": "SoundGo",
    "price": 89.99,
    "stock": 150,
    "description": "True wireless earbuds with premium sound quality and advanced features.",
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop",
    "details": {
      "audio": {
        "drivers": "10mm dynamic drivers",
        "frequency": "20Hz - 20kHz",
        "impedance": "32Ω",
        "sensitivity": "103dB ±3dB"
      },
      "battery": {
        "earbuds": "5 hours per charge",
        "case": "Additional 10 hours",
        "total": "15 hours playback",
        "charging_time": {
          "earbuds": "1 hour",
          "case": "2 hours"
        },
        "quick_charge": "10 minutes for 1 hour playback"
      },
      "connectivity": {
        "bluetooth": "5.2",
        "range": "10m (33ft)",
        "codecs": [
          "SBC",
          "AAC",
          "aptX"
        ],
        "multipoint": "Connect to 2 devices"
      },
      "features": {
        "noise_control": [
          "Active Noise Cancellation",
          "Transparency mode",
          "Wind noise reduction"
        ],
        "controls": "Touch controls on both earbuds",
        "voice_assistant": "Compatible with Siri/Google Assistant",
        "ear_detection": "Auto pause/play"
      },
      "water_resistance": "IPX5",
      "dimensions": {
        "earbuds": "21.8 x 18.9 x 22.4mm",
        "case": "60 x 45.2 x 25.1mm"
      },
      "weight": {
        "per_earbud": "5.4g",
        "case": "45g"
      },
      "in_box": [
        "Earbuds",
        "Charging case",
        "USB-C cable",
        "3 pairs of ear tips (S/M/L)",
        "User manual"
      ],
      "warranty": "1 year manufacturer warranty"
    }
  },
  {
    "id": 13,
    "name": "Cyber Legends 2077",
    "category": "PC Games",
    "brand": "Digital Dreams Studio",
    "price": 59.99,
    "stock": 500,
    "description": "Next-gen open-world RPG with groundbreaking AI and stunning ray-traced graphics.",
    "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop",
    "details": {
      "genre": [
        "RPG",
        "Open World",
        "Action",
        "Sci-Fi"
      ],
      "release_date": "2025-01-01",
      "version": "1.2.1",
      "rating": "ESRB M (Mature)",
      "languages": {
        "interface": [
          "English",
          "Spanish",
          "French",
          "German",
          "Japanese",
          "Chinese"
        ],
        "audio": [
          "English",
          "Japanese",
          "French",
          "German"
        ],
        "subtitles": "20+ languages"
      },
      "system_requirements": {
        "minimum": {
          "os": "Windows 10 64-bit",
          "processor": "AMD Ryzen 5 3600 or Intel i5-10400",
          "memory": "16 GB RAM",
          "graphics": "NVIDIA RTX 3060 8GB or AMD RX 6600 XT",
          "storage": "100 GB SSD",
          "directx": "Version 12"
        },
        "recommended": {
          "os": "Windows 11 64-bit",
          "processor": "AMD Ryzen 7 5800X or Intel i7-12700K",
          "memory": "32 GB RAM",
          "graphics": "NVIDIA RTX 4070 12GB or AMD RX 7700 XT",
          "storage": "100 GB NVMe SSD",
          "directx": "Version 12 Ultimate"
        }
      },
      "features": {
        "gameplay": [
          "Massive open world",
          "Dynamic weather system",
          "Advanced AI NPCs",
          "Multiple endings",
          "Character customization"
        ],
        "graphics": [
          "Ray tracing support",
          "DLSS 3.0",
          "FSR 3.0",
          "HDR support",
          "Ultra-wide support"
        ],
        "multiplayer": {
          "modes": [
            "Co-op campaign",
            "PvP arenas",
            "Shared world events"
          ],
          "players": "1-64 players"
        }
      },
      "dlc": [
        "Season Pass included",
        "Future content updates",
        "Exclusive cosmetics"
      ],
      "edition": "Digital Deluxe",
      "platform": {
        "drm": "Steam, Epic Games",
        "cloud_save": "Yes",
        "achievements": "Yes",
        "controller_support": "Full"
      }
    }
  },
  {
    "id": 14,
    "name": "Strategy Empire IV",
    "category": "PC Games",
    "brand": "Global Games",
    "price": 49.99,
    "stock": 300,
    "description": "Epic historical strategy game with advanced diplomacy and real-time battles.",
    "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=600&fit=crop",
    "details": {
      "genre": [
        "Strategy",
        "Historical",
        "Real-time Tactics",
        "Grand Strategy"
      ],
      "release_date": "2024-12-15",
      "version": "1.0.3",
      "rating": "ESRB T (Teen)",
      "languages": {
        "interface": [
          "English",
          "French",
          "German",
          "Spanish",
          "Russian",
          "Chinese"
        ],
        "audio": [
          "English",
          "French",
          "German"
        ],
        "subtitles": "15+ languages"
      },
      "system_requirements": {
        "minimum": {
          "os": "Windows 10 64-bit",
          "processor": "AMD Ryzen 3 3300X or Intel i3-10100",
          "memory": "8 GB RAM",
          "graphics": "NVIDIA GTX 1660 Super or AMD RX 5600 XT",
          "storage": "50 GB SSD",
          "directx": "Version 11"
        },
        "recommended": {
          "os": "Windows 10/11 64-bit",
          "processor": "AMD Ryzen 5 5600X or Intel i5-12600K",
          "memory": "16 GB RAM",
          "graphics": "NVIDIA RTX 3060 Ti or AMD RX 6700 XT",
          "storage": "50 GB NVMe SSD",
          "directx": "Version 12"
        }
      },
      "features": {
        "gameplay": [
          "40 playable civilizations",
          "Dynamic campaign system",
          "Advanced AI diplomacy",
          "Historical battles",
          "Custom scenario editor"
        ],
        "graphics": [
          "4K textures",
          "Dynamic weather effects",
          "Advanced unit animations",
          "Detailed terrain system"
        ],
        "multiplayer": {
          "modes": [
            "Competitive matches",
            "Co-op campaigns",
            "Custom scenarios"
          ],
          "players": "2-8 players"
        }
      },
      "dlc": [
        "Civilization Pack I",
        "Campaign Pack",
        "Unit Pack"
      ],
      "edition": "Emperor Edition",
      "platform": {
        "drm": "Steam",
        "cloud_save": "Yes",
        "achievements": "100+ achievements",
        "workshop": "Mod support"
      }
    }
  },
  {
    "id": 15,
    "name": "Space Explorers Online",
    "category": "PC Games",
    "brand": "Stellar Games",
    "price": 39.99,
    "stock": 1000,
    "description": "Massive multiplayer space exploration game with realistic physics and player-driven economy.",
    "image": "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop",
    "details": {
      "genre": [
        "MMO",
        "Space Simulation",
        "Sandbox",
        "Trading"
      ],
      "release_date": "2024-11-30",
      "version": "2.5.0",
      "rating": "ESRB T (Teen)",
      "languages": {
        "interface": [
          "English",
          "German",
          "French",
          "Russian",
          "Chinese",
          "Korean"
        ],
        "audio": ["English"],
        "subtitles": "12+ languages"
      },
      "system_requirements": {
        "minimum": {
          "os": "Windows 10 64-bit",
          "processor": "AMD Ryzen 5 2600 or Intel i5-9400",
          "memory": "12 GB RAM",
          "graphics": "NVIDIA GTX 1070 or AMD RX 5600 XT",
          "storage": "75 GB SSD",
          "network": "Broadband Internet connection"
        },
        "recommended": {
          "os": "Windows 10/11 64-bit",
          "processor": "AMD Ryzen 7 5800X or Intel i7-12700K",
          "memory": "32 GB RAM",
          "graphics": "NVIDIA RTX 3070 or AMD RX 6800",
          "storage": "75 GB NVMe SSD",
          "network": "High-speed Internet connection"
        }
      },
      "features": {
        "gameplay": [
          "Persistent universe",
          "Real-time space combat",
          "Trading and economy",
          "Base building",
          "Fleet management"
        ],
        "graphics": [
          "Volumetric clouds",
          "Ray traced reflections",
          "Realistic star systems",
          "Dynamic ship damage"
        ],
        "multiplayer": {
          "type": "MMO",
          "features": [
            "Guilds/Corporations",
            "Player trading",
            "Territory control",
            "Group missions"
          ],
          "servers": ["NA", "EU", "ASIA"]
        }
      },
      "subscription": {
        "model": "Monthly subscription",
        "price": "14.99/month",
        "benefits": [
          "Full game access",
          "Monthly rewards",
          "Priority server queue"
        ]
      },
      "microtransactions": {
        "types": [
          "Cosmetic items",
          "Ship skins",
          "Character customization"
        ],
        "currency": "Stellar Credits"
      },
      "platform": {
        "drm": "Custom launcher",
        "cloud_save": "Yes",
        "achievements": "Yes",
        "crossplay": "No"
      }
    }
  },
  {
    "id": 16,
    "name": "NextGen Gaming Console",
    "category": "Gaming Hardware",
    "brand": "GameTech",
    "price": 499.99,
    "stock": 75,
    "description": "Next-generation gaming console featuring 4K gaming, ray tracing, and lightning-fast load times.",
    "image": "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=600&fit=crop",
    "details": {
      "hardware": {
        "cpu": "Custom AMD Zen 3 8-core processor",
        "gpu": "Custom RDNA 3 GPU 12 TFLOPS",
        "ram": "16GB GDDR6",
        "storage": "1TB Custom NVMe SSD",
        "expandable_storage": "NVMe SSD slot"
      },
      "performance": {
        "resolution": "4K native, 8K supported",
        "frame_rate": "Up to 120fps",
        "ray_tracing": "Hardware-accelerated",
        "load_times": "Ultra-fast loading",
        "variable_refresh": "VRR support"
      },
      "features": {
        "backwards_compatibility": "Previous gen games supported",
        "quick_resume": "Multiple game states",
        "hdr": "Dolby Vision Gaming",
        "audio": "3D Spatial Audio",
        "smart_delivery": "Cross-gen game optimization"
      },
      "connectivity": {
        "hdmi": "HDMI 2.1",
        "usb": [
          "3 x USB 3.2 Gen 2",
          "1 x USB-C"
        ],
        "network": {
          "ethernet": "2.5Gbps",
          "wifi": "Wi-Fi 6E",
          "bluetooth": "5.2"
        }
      },
      "included": [
        "Gaming Console",
        "Wireless Controller",
        "Ultra High-Speed HDMI Cable",
        "Power Cable",
        "Quick Start Guide"
      ],
      "controller": {
        "features": [
          "Haptic feedback",
          "Adaptive triggers",
          "Motion controls",
          "Built-in microphone",
          "Share button"
        ],
        "battery": "Rechargeable 1500mAh",
        "connection": "Bluetooth/USB-C"
      },
      "online_services": {
        "gaming_network": "Online multiplayer support",
        "cloud_gaming": "Yes",
        "cloud_saves": "Automatic sync",
        "social": "Voice chat, parties, messaging"
      },
      "physical": {
        "dimensions": "300 x 240 x 60mm",
        "weight": "3.8kg",
        "color": "Matte Black",
        "cooling": "Liquid metal thermal solution"
      },
      "power": {
        "consumption": "350W max",
        "supply": "Internal PSU",
        "eco_mode": "Low-power standby"
      },
      "warranty": "1 year manufacturer warranty"
    }
  }
]
