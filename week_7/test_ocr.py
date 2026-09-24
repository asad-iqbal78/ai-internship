import easyocr

print("Loading EasyOCR...")

reader = easyocr.Reader(['en'], gpu=False)

print("EasyOCR loaded successfully!")