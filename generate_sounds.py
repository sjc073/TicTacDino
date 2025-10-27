import pyfxr
import wave
import base64
import struct
import io

def get_buffer(sound):
    """Gets the sound buffer from a pyfxr sound object."""
    if isinstance(sound, pyfxr.SFX):
        return sound.__buffer__(sound)
    return sound

def wav_to_base64_in_memory(sound_buffer, channels=1, sample_width=2, framerate=44100):
    """Creates a WAV file in memory and returns its base64 encoded string."""
    with io.BytesIO() as wav_file:
        with wave.open(wav_file, 'wb') as f:
            f.setnchannels(channels)
            f.setsampwidth(sample_width)
            f.setframerate(framerate)
            for sample in sound_buffer:
                # Clamp the sample to the range [-1, 1]
                clamped_sample = max(-1.0, min(1.0, sample))
                f.writeframes(struct.pack('<h', int(clamped_sample * 32767)))
        binary_data = wav_file.getvalue()
        base64_data = base64.b64encode(binary_data)
        return base64_data.decode('utf-8')

if __name__ == "__main__":
    # Generate sounds
    place_sound = pyfxr.pluck(duration=0.5, pitch='C4')
    win_sound = pyfxr.powerup()
    draw_sound = pyfxr.explosion()

    # Get buffers
    place_buffer = get_buffer(place_sound)
    win_buffer = get_buffer(win_sound)
    draw_buffer = get_buffer(draw_sound)

    # Convert to base64 in memory
    place_base64 = wav_to_base64_in_memory(place_buffer)
    win_base64 = wav_to_base64_in_memory(win_buffer)
    draw_base64 = wav_to_base64_in_memory(draw_buffer)

    # Print base64 strings
    print(f"place_base64: {place_base64}")
    print(f"win_base64: {win_base64}")
    print(f"draw_base64: {draw_base64}")