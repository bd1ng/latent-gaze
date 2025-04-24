# The Latent Gaze

This project generated large-scale datasets of Stable Diffusion XL outputs based on prompts of single-word social designation, like immigrant, leader, and nurse. It was intended to explore how models are trained to interpret identity and how these generalizations are then embedded into visual representations. After generating thousands of photos for each prompt, I used the mediapipe library to filter photos for facial position, as well as adjust photos (via rotation, cropping, scaling). This allowed for the creation of "composite portraits," in which each pixel represents the median pixel value across all portraits. 

## ComfyUI Workflow
This repository includes the ComfyUI workflow used to generate large batches of images across a series of prompts. You will need access to WAS Node Suite, YANC, and Custom Scripts. Adjust prompts by creating a .txt file and linking to it in the file_path field of "Text Load Line From File" Node. Adjust file name components as needed. Adapted from original workflow by Andrés Zsögön (https://www.andreszsogon.com/comfyui-load-prompts-from-text-file-sample-workflow).

## Portrait Preparation
Load all images intended for composite portrait into the "images" file. Run portrait.py. All processed images will appear in the "aligned" folder. Skipped photos will be logged in a new document "skipped_images.txt." 

## Composite Generation
When all images have been prepared by portrait.py (see above), simply run overlay.py. This will pull directly from the "aligned" folder.  A composite image will be generated in the directory. 

