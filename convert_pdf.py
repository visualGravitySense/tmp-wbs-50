import fitz  # PyMuPDF
import sys
import os

pdf_path = sys.argv[1]
output_path = sys.argv[2]

try:
    doc = fitz.open(pdf_path)
    page = doc.load_page(0)  # first page
    pix = page.get_pixmap(dpi=300)
    pix.save(output_path)
    print(f"Successfully saved to {output_path}")
except Exception as e:
    print(f"Error with PyMuPDF: {e}")
    # try pdf2image as fallback
    try:
        from pdf2image import convert_from_path
        images = convert_from_path(pdf_path, dpi=300)
        images[0].save(output_path, 'PNG')
        print(f"Successfully saved using pdf2image to {output_path}")
    except Exception as e2:
        print(f"Error with pdf2image: {e2}")
        sys.exit(1)
