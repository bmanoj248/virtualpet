# 🔊 PixelPaw Sound Files

This directory contains MP3 audio files for realistic pet sounds.

## 📁 Directory Structure

```
sounds/
├── pets/          # Pet-specific sounds
│   ├── dog.mp3
│   ├── cat.mp3
│   ├── bird.mp3
│   ├── rabbit.mp3
│   ├── fox.mp3
│   └── bear.mp3
└── ui/            # UI feedback sounds
    ├── money.mp3
    ├── heal.mp3
    ├── sleep.mp3
    ├── levelup.mp3
    ├── achievement.mp3
    └── error.mp3
```

## 🐾 Pet Sound Files Needed

### **pets/dog.mp3**
- A friendly dog bark sound
- Duration: ~0.3-0.5 seconds
- Example: "Woof woof" or "Arf arf"

### **pets/cat.mp3**
- A cat meow sound
- Duration: ~0.4-0.6 seconds
- Example: Clear cat meow

### **pets/bird.mp3**
- Bird chirping sound
- Duration: ~0.3-0.5 seconds
- Example: Tweet or chirp sounds

### **pets/rabbit.mp3**
- Soft rabbit squeak or nose twitching sound
- Duration: ~0.2-0.4 seconds
- Example: Gentle squeak or sniffing

### **pets/fox.mp3**
- Fox yip or yelp sound
- Duration: ~0.3-0.5 seconds
- Example: Quick fox vocalization

### **pets/bear.mp3**
- Bear growl or grunt sound
- Duration: ~0.4-0.6 seconds
- Example: Low rumbling growl

## 🎮 UI Sound Files Needed

### **ui/money.mp3**
- Pleasant chime or coin sound
- Duration: ~0.2-0.4 seconds
- Plays when earning money from chores/tricks

### **ui/heal.mp3**
- Healing or restoration sound
- Duration: ~0.3-0.5 seconds
- Plays during vet visits and heal actions

### **ui/sleep.mp3**
- Soothing or calming sound
- Duration: ~0.3-0.5 seconds
- Plays when entering rest mode

### **ui/levelup.mp3**
- Celebration or fanfare sound
- Duration: ~0.5-1.0 seconds
- Plays when pet levels up

### **ui/achievement.mp3**
- Trophy or success sound
- Duration: ~0.3-0.5 seconds
- Plays when unlocking badges/achievements

### **ui/error.mp3**
- Error or negative feedback sound
- Duration: ~0.2-0.3 seconds
- Plays when actions can't be performed

## 📝 File Requirements

- **Format**: MP3 (MPEG-1 Audio Layer 3)
- **Bitrate**: 128-192 kbps recommended
- **Sample Rate**: 44.1 kHz recommended
- **Channels**: Mono or Stereo
- **Volume**: Normalized to prevent clipping

## 🎵 Sound Mode Options

Users can choose between two sound modes in Settings:

1. **Game Sounds** - Synthesized sounds using Web Audio API (no files needed)
2. **Realistic Sounds** - MP3 audio files (requires files in this directory)

## 🔍 Where to Find Sounds

### Free Sound Resources:
- **Freesound.org** - Community sound library (CC licenses)
- **ZapSplat** - Free sound effects library
- **SoundBible.com** - Royalty-free sounds
- **BBC Sound Effects** - Free sound archive

### Tips for Finding Sounds:
- Search for "dog bark short"
- Search for "cat meow single"
- Look for sounds under 1 second
- Choose clear, high-quality recordings
- Check licensing (use royalty-free or CC0)

## ⚠️ Important Notes

1. **Fallback System**: If MP3 files are missing, the game will automatically fall back to synthesized sounds
2. **File Names**: Must match exactly (case-sensitive on some systems)
3. **File Paths**: Relative to the root directory: `sounds/pets/dog.mp3`
4. **Browser Support**: All modern browsers support MP3 playback

## 🚀 Getting Started

1. Download or record the sound files
2. Convert to MP3 format if needed
3. Place in appropriate folders (pets/ or ui/)
4. Test in-game by switching to "Realistic Sounds" in Settings
5. If a file is missing, synthesized sound will play instead

---

**Note**: The game works perfectly without MP3 files using the built-in synthesized sounds. MP3 files are an optional enhancement for users who prefer realistic audio!

