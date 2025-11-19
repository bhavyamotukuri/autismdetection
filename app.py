from flask import Flask, render_template_string, request
import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

MODEL_PATH = "autism_resnet.pth"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
IMG_SIZE = 224

# ---------------------------
# Load Model
# ---------------------------
model = models.resnet18(weights=None)
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, 2)  # autism vs control
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model = model.to(DEVICE)
model.eval()

# ---------------------------
# Transform for inference
# ---------------------------
transform = transforms.Compose([
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

# ---------------------------
# HTML UI
# ---------------------------
HTML_PAGE = """
<!DOCTYPE html>
<html>
<head>
    <title>Autism MRI Classifier</title>
    <style>
        body { font-family: Arial; background: #f3f4f6; text-align: center; padding: 60px; }
        .container { background: white; padding: 40px; border-radius: 16px; display: inline-block; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        input[type=file] { margin: 20px 0; }
        button { background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; }
        button:hover { background: #45a049; }
        .result { margin-top: 30px; font-size: 1.3em; color: #333; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🧠 Autism MRI Classifier</h1>
        <form method="POST" enctype="multipart/form-data">
            <input type="file" name="file" accept=".png" required>
            <br>
            <button type="submit">Analyze MRI</button>
        </form>
        {% if result %}
            <div class="result">
                <strong>Diagnosis:</strong> {{ result }}
            </div>
        {% endif %}
    </div>
</body>
</html>
"""

# ---------------------------
# Prediction Function
# ---------------------------
def predict_image(img_path):
    image = Image.open(img_path).convert("RGB")
    image = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(image)
        _, preds = torch.max(outputs, 1)
    
    class_names = ['autism', 'control']
    return class_names[preds.item()].capitalize()

# ---------------------------
# Flask Routes
# ---------------------------
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    if request.method == "POST":
        file = request.files["file"]
        if file:
            path = "uploaded.png"
            file.save(path)
            result = predict_image(path)
            os.remove(path)
    return render_template_string(HTML_PAGE, result=result)

if __name__ == "__main__":
    app.run(debug=True)
