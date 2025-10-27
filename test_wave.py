
import wave
import struct
import os

cwd = os.getcwd()
filename = os.path.join(cwd, "test.wav")
print(f"Current working directory: {cwd}")
print(f"Absolute path to file: {filename}")

sound_buffer = [0.5, -0.5, 0.5, -0.5] # some dummy data
channels = 1
sample_width = 2
framerate = 44100

with open(filename, 'wb') as f:
    f_wave = wave.open(f, 'w')
    f_wave.setnchannels(channels)
    f_wave.setsampwidth(sample_width)
    f_wave.setframerate(framerate)
    for sample in sound_buffer:
        f_wave.writeframes(struct.pack('<h', int(sample * 32767)))
    f_wave.close()

print(f"Successfully wrote to {filename}")
