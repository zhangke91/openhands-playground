# Image Text Extractor

A web application that extracts text from images using OCR (Optical Character Recognition) technology.

![OCR Demo](https://example.com/ocr-demo.gif)

## Features

- Upload images via drag-and-drop or file selection
- Preview uploaded images before processing
- Extract text from images using Tesseract OCR
- Copy extracted text to clipboard
- Responsive design for desktop and mobile devices

## Technologies Used

- **Backend**: Flask (Python)
- **OCR Engine**: Tesseract OCR with pytesseract
- **Frontend**: HTML, CSS, JavaScript
- **Image Processing**: PIL (Python Imaging Library)

## Installation

### Prerequisites

- Python 3.6+
- Tesseract OCR

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/image-text-extractor.git
   cd image-text-extractor
   ```

2. Install Python dependencies:
   ```
   pip install flask pytesseract pillow
   ```

3. Install Tesseract OCR:
   - **Linux**: `apt-get install tesseract-ocr`
   - **macOS**: `brew install tesseract`
   - **Windows**: Download and install from [GitHub](https://github.com/UB-Mannheim/tesseract/wiki)

4. Run the application:
   ```
   python app.py
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:12000
   ```

## Usage

1. Upload an image containing text by dragging and dropping it into the designated area or by clicking the "Choose File" button
2. Preview the uploaded image
3. Click the "Extract Text" button to process the image
4. View the extracted text in the result area
5. Copy the extracted text to your clipboard with the "Copy Text" button

## Limitations

- Works best with clear, high-resolution images containing printed text
- May have difficulty with handwritten text, stylized fonts, or low-quality images
- Currently supports common image formats: PNG, JPG, JPEG, GIF, BMP, TIFF

## License

MIT License