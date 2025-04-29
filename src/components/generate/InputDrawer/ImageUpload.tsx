import { useState, useRef } from 'react'
import { usePalette } from '../../../hooks/usePalette'
import { extractColorsFromImage } from '../../../algorithms/generation/imageBased'
import { hslToRGB, rgbToHSL } from '../../../algorithms/colorModels/conversions'
import './ImageUpload.css'

const ImageUpload = () => {
  const { generatePalette } = usePalette()
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [colorCount, setColorCount] = useState(5)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    
    if (files && files.length > 0) {
      const file = files[0]
      
      // Only accept image files
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }
      
      // Create URL for the image
      const url = URL.createObjectURL(file)
      setImageUrl(url)
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }
  
  const handleGenerateClick = async () => {
    if (!imageUrl || !canvasRef.current) {
      return
    }
    
    setIsLoading(true)
    
    try {
      // Load the image
      const img = new Image()
      img.crossOrigin = 'anonymous'
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = imageUrl
      })
      
      // Draw image to canvas to get pixel data
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      
      if (!ctx) {
        throw new Error('Could not get canvas context')
      }
      
      // Scale image to a reasonable size for processing
      const maxSize = 300
      const scale = Math.min(maxSize / img.width, maxSize / img.height)
      const width = img.width * scale
      const height = img.height * scale
      
      canvas.width = width
      canvas.height = height
      
      ctx.drawImage(img, 0, 0, width, height)
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, width, height)
      
      // Extract colors
      const dominantColors = await extractColorsFromImage(imageData, colorCount)
      
      // Convert to HSL for the palette generator
      const hslColors = dominantColors.map(rgb => rgbToHSL(rgb))
      
      // Generate palette using the extracted colors
      generatePalette({
        paletteSize: colorCount,
        extractedColors: hslColors,
        preserveLocked: true
      })
      
    } catch (error) {
      console.error('Error extracting colors:', error)
      alert('Failed to extract colors from the image. Please try another image.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleRemoveImage = () => {
    setImageUrl(null)
  }

  return (
    <div className="image-upload">
      <div className="image-preview-container">
        {imageUrl ? (
          <div className="image-preview">
            <img src={imageUrl} alt="Uploaded preview" />
            <button 
              className="remove-image" 
              onClick={handleRemoveImage}
              aria-label="Remove image"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="upload-placeholder" onClick={() => fileInputRef.current?.click()}>
            <div className="upload-icon">+</div>
            <p>Click to upload an image</p>
            <span className="upload-hint">JPG, PNG, WebP up to 5MB</span>
          </div>
        )}
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="file-input"
      />
      
      <div className="color-count-selector">
        <label htmlFor="color-count">Number of colors to extract:</label>
        <select
          id="color-count"
          value={colorCount}
          onChange={(e) => setColorCount(parseInt(e.target.value))}
        >
          <option value="3">3 colors</option>
          <option value="5">5 colors</option>
          <option value="7">7 colors</option>
          <option value="10">10 colors</option>
        </select>
      </div>
      
      <button
        className="generate-button"
        onClick={handleGenerateClick}
        disabled={!imageUrl || isLoading}
      >
        {isLoading ? 'Extracting Colors...' : 'Extract Colors from Image'}
      </button>
      
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ImageUpload
