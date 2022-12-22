import os
from PIL import Image


def resize_image(fname, threshold = 2.5 * 10**5):
    im_size = os.path.getsize(f"./{fname}")
    if im_size > threshold:
        scaling_factor = threshold / im_size
    im = Image.open(f"./{fname}")
    
    width = int(im.width * scaling_factor)
    height = int(im.height * scaling_factor)
    im = im.resize((width, height))
    im.save(f"./resized_{fname}")
