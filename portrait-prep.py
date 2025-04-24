import os
import cv2
import numpy as np
import mediapipe as mp

# === CONFIG ===
INPUT_DIR = 'images/'
OUTPUT_DIR = 'aligned/'
SKIPPED_LOG = 'skipped_images.txt'
CANVAS_SIZE = (800, 800)
TARGET_EYE_DIST = 120
TARGET_LEFT_EYE_POS = (340, 300)

os.makedirs(OUTPUT_DIR, exist_ok=True)

mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True)

LEFT_EYE = [33, 133]
RIGHT_EYE = [362, 263]
NOSE = 1


def get_eye_center(landmarks, indices, image_shape):
    h, w = image_shape[:2]
    pts = [(int(landmarks[i].x * w), int(landmarks[i].y * h)) for i in indices]
    return np.mean(pts, axis=0)


def is_forward_facing(landmarks, image_shape):
    h, w = image_shape[:2]
    left_eye = get_eye_center(landmarks, LEFT_EYE, image_shape)
    right_eye = get_eye_center(landmarks, RIGHT_EYE, image_shape)
    nose = landmarks[NOSE]
    nose_x = nose.x * w

    # nose centered between eyes
    eye_mid_x = (left_eye[0] + right_eye[0]) / 2
    nose_offset = abs(nose_x - eye_mid_x)
    max_nose_offset = 0.04 * w

    # eyes horizontal alignment
    eye_diff_x = abs(left_eye[0] - right_eye[0])
    eye_diff_y = abs(left_eye[1] - right_eye[1])
    is_level = eye_diff_x > eye_diff_y * 3

    # eye-nose balance
    left_nose_dist = abs(left_eye[0] - nose_x)
    right_nose_dist = abs(right_eye[0] - nose_x)
    eye_balance_ratio = min(left_nose_dist, right_nose_dist) / max(left_nose_dist, right_nose_dist)

    return (nose_offset < max_nose_offset) and is_level and (eye_balance_ratio > 0.65)


def align_image(img, left_eye, right_eye):
    delta = right_eye - left_eye
    angle = np.degrees(np.arctan2(delta[1], delta[0]))
    center = tuple(np.mean([left_eye, right_eye], axis=0))
    rot_mat = cv2.getRotationMatrix2D(center, angle, 1.0)
    rotated = cv2.warpAffine(img, rot_mat, (img.shape[1], img.shape[0]))

    new_left = rot_mat @ np.append(left_eye, 1)
    new_right = rot_mat @ np.append(right_eye, 1)

    current_dist = np.linalg.norm(new_right - new_left)
    scale = TARGET_EYE_DIST / current_dist
    resized = cv2.resize(rotated, (0, 0), fx=scale, fy=scale)

    new_left_scaled = new_left * scale
    dx = TARGET_LEFT_EYE_POS[0] - new_left_scaled[0]
    dy = TARGET_LEFT_EYE_POS[1] - new_left_scaled[1]

    canvas = np.zeros((CANVAS_SIZE[1], CANVAS_SIZE[0], 3), dtype=np.uint8)
    x_offset = int(dx)
    y_offset = int(dy)

    x1 = max(0, x_offset)
    y1 = max(0, y_offset)
    x2 = min(CANVAS_SIZE[0], x_offset + resized.shape[1])
    y2 = min(CANVAS_SIZE[1], y_offset + resized.shape[0])

    src_x1 = max(0, -x_offset)
    src_y1 = max(0, -y_offset)

    canvas[y1:y2, x1:x2] = resized[src_y1:src_y1 + (y2 - y1), src_x1:src_x1 + (x2 - x1)]
    return canvas


# === MAIN LOOP ===
skipped = []
for file in os.listdir(INPUT_DIR):
    if not file.lower().endswith(('.jpg', '.png', '.jpeg')):
        continue

    path = os.path.join(INPUT_DIR, file)
    img = cv2.imread(path)
    if img is None:
        continue

    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    result = face_mesh.process(rgb)

    if not result.multi_face_landmarks:
        skipped.append((file, "no_face"))
        continue

    landmarks = result.multi_face_landmarks[0].landmark
    if not is_forward_facing(landmarks, img.shape):
        skipped.append((file, "not_forward_facing"))
        continue

    left_eye = get_eye_center(landmarks, LEFT_EYE, img.shape)
    right_eye = get_eye_center(landmarks, RIGHT_EYE, img.shape)

    aligned = align_image(img, left_eye, right_eye)
    cv2.imwrite(os.path.join(OUTPUT_DIR, file), aligned)

# Log skipped files
with open(SKIPPED_LOG, 'w') as f:
    for filename, reason in skipped:
        f.write(f"{filename}\t{reason}\n")

print("Complete, aligned images saved to:", OUTPUT_DIR)
print(f"Skipped images logged to {SKIPPED_LOG}")