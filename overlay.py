import numpy as np
import cv2
import os

aligned_folder = 'aligned/'
output_path = 'composite_median.png'

images = []
for file in sorted(os.listdir(aligned_folder)):
    if file.lower().endswith(('.png', '.jpg', '.jpeg')):
        img = cv2.imread(os.path.join(aligned_folder, file))
        images.append(img)

# Stack and compute median
stack = np.stack(images, axis=0)
composite = np.median(stack, axis=0).astype(np.uint8)

cv2.imwrite(output_path, composite)
print(f"Composite saved to {output_path}")