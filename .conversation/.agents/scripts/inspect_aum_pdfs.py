import fitz
from pathlib import Path
from PIL import Image, ImageDraw

files = [
    (Path('attached_assets/c39f209e-7023-4eae-bb29-20a4b95c5ffd_1789541223457.pdf'), Path('.agents/outputs/pdf1')),
    (Path('attached_assets/090eb193-9715-4c8c-9334-1799816c20d2_(1)_1789541234177.pdf'), Path('.agents/outputs/pdf2')),
]
for pdf_path, out_dir in files:
    doc = fitz.open(pdf_path)
    print(f'{pdf_path.name}: {len(doc)} pages')
    thumbs = []
    for i, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(0.45, 0.45), alpha=False)
        page_path = out_dir / f'page-{i+1:02d}.png'
        pix.save(page_path)
        thumbs.append(Image.open(page_path).convert('RGB'))
        print(f' page {i+1}: images={len(page.get_images(full=True))}, text_chars={len(page.get_text())}, size={page.rect.width:.0f}x{page.rect.height:.0f}')
    cols = 4
    gap = 16
    label_h = 26
    cell_w = max(im.width for im in thumbs)
    cell_h = max(im.height for im in thumbs)
    rows = (len(thumbs)+cols-1)//cols
    sheet = Image.new('RGB', (cols*cell_w+(cols+1)*gap, rows*(cell_h+label_h)+(rows+1)*gap), 'white')
    draw = ImageDraw.Draw(sheet)
    for idx, im in enumerate(thumbs):
        x = gap + (idx % cols)*(cell_w+gap)
        y = gap + (idx // cols)*(cell_h+label_h+gap)
        sheet.paste(im, (x,y+label_h))
        draw.text((x, y+4), f'Page {idx+1}', fill='black')
    sheet_path = out_dir / 'contact-sheet.png'
    sheet.save(sheet_path)
    print(f' contact sheet: {sheet_path}')
