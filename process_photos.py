import os
import math
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

def make_vignette(size, color, strength=0.8):
    # color: (R, G, B)
    w, h = size
    # Create radial gradient
    mask = Image.new('L', (w, h))
    draw = ImageDraw.Draw(mask)
    
    # We will draw concentric circles or use distance from center
    # For speed, let's just make it simple
    # But Pillow doesn't have a direct radial gradient, so let's do small steps
    center_x, center_y = w / 2, h / 2
    max_dist = math.hypot(center_x, center_y)
    
    # To ensure it runs fast, we create a small radial gradient, then resize
    small_w, small_h = w // 10, h // 10
    small_mask = Image.new('L', (small_w, small_h))
    
    for y in range(small_h):
        for x in range(small_w):
            cx, cy = small_w / 2, small_h / 2
            dist = math.hypot(x - cx, y - cy)
            max_d = math.hypot(cx, cy)
            # Normalize dist
            norm_dist = dist / max_d
            # non-linear falloff
            alpha = int(255 * (norm_dist ** 2) * strength)
            alpha = min(255, alpha)
            small_mask.putpixel((x, y), alpha)
            
    vignette_alpha = small_mask.resize((w, h), Image.Resampling.LANCZOS)
    vignette_layer = Image.new('RGBA', (w, h), color + (255,))
    vignette_layer.putalpha(vignette_alpha)
    return vignette_layer

def process_photos():
    images = [f"app-screenshot-{i}.png" for i in range(1, 6)]
    
    try:
        logo_img = Image.open("kiito-logo.png").convert("RGBA")
    except Exception as e:
        print("Logo not found", e)
        return

    # Resize logo so it fits nicely
    logo_size = 400
    logo_img = logo_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
    
    # Transparency 40% means opacity 40%, so alpha * 0.4
    r, g, b, a = logo_img.split()
    a = a.point(lambda p: p * 0.4)
    logo_img.putalpha(a)
    
    # Light cool burgundy RGB equivalent
    burgundy_color = (130, 80, 100)
    
    for img_name in images:
        if not os.path.exists(img_name):
            continue
            
        print(f"Processing {img_name}...")
        base_img = Image.open(img_name).convert("RGBA")
        w, h = base_img.size
        
        # 1. slight vignette, color fringes light cool burgundy
        vignette_layer = make_vignette((w, h), burgundy_color, strength=0.9)
        base_with_vignette = Image.alpha_composite(base_img, vignette_layer)
        
        # 2. Add high contrast/cleanness to keep labels sharp
        enhancer = ImageEnhance.Contrast(base_with_vignette.convert("RGB"))
        enhanced_bg = enhancer.enhance(1.05)
        
        # 3. Logo revolves in the center
        # We will create an animated GIF of 30 frames (360 degrees)
        frames = []
        center_x, center_y = w // 2, h // 2
        
        for frame_idx in range(20): # 20 frames for a smooth but quick gif
            angle = (360 / 20) * frame_idx
            frame_bg = enhanced_bg.copy().convert("RGBA")
            
            rotated_logo = logo_img.rotate(-angle, resample=Image.Resampling.BICUBIC, expand=False)
            
            lw, lh = rotated_logo.size
            paste_x = center_x - lw // 2
            paste_y = center_y - lh // 2
            
            frame_bg.alpha_composite(rotated_logo, (paste_x, paste_y))
            # Convert to RGB to save as GIF/JPEG
            # Actually, let's save as GIF
            # Wait, "create a high-quality kiito-logo image". They might just want a static JPG
            # Let's save both a static image and the animated gif
            
            frames.append(frame_bg.convert("RGB"))
            
        # Save static image (the first frame)
        out_name_static = img_name.replace(".png", "_final.jpg")
        frames[0].save(out_name_static, quality=95)
        
        # Save animated GIF
        out_name_gif = img_name.replace(".png", "_revolving.gif")
        frames[0].save(
            out_name_gif,
            save_all=True,
            append_images=frames[1:],
            optimize=True,
            duration=50, # 50ms per frame = 20 fps
            loop=0
        )
        print(f"Saved {out_name_static} and {out_name_gif}")

if __name__ == "__main__":
    process_photos()
