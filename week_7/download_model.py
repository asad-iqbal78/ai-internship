from huggingface_hub import hf_hub_download
import shutil
import os

model_path = hf_hub_download(
    repo_id="joker5914/yolov8n-license-plate",
    filename="best.pt"
)

os.makedirs("models", exist_ok=True)

shutil.copy(model_path, "models/best.pt")

print("best.pt downloaded successfully!")
print("Saved at: models/best.pt")