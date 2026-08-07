// Single source of truth for project artwork, shared by the 3D gallery and the
// flat card fallback. Imported eagerly so Vite fingerprints and bundles them.
import fallbackImage from '../assetes/image.jpg';
import aiAssistantImage from '../assetes/project/ai-personnal-assistant.jpeg';
import smartHomeImage from '../assetes/project/smart-home-llm.jpeg';
import multiDocImage from '../assetes/project/multidocument-chatbot.jpeg';
import eyeDiseaseImage from '../assetes/project/eye-disease-detector.jpeg';
import concreteImage from '../assetes/project/concrete-optimizer.jpeg';
import spamImage from '../assetes/project/spam-detector.jpeg';
import recipeImage from '../assetes/project/recipe app.jpeg';
import transformerImage from '../assetes/project/transformer-scratch-tensorflow.jpeg';
import doctorImage from '../assetes/project/doctor-appointment-booking.jpeg';
import cicdImage from '../assetes/project/cicd.png';
import llamaImage from '../assetes/project/LLaMA-7B.png';
import diffusionImage from '../assetes/project/diffusion-model-fintune.png';
import drugDiscoveryImage from '../assetes/project/drug-discovery.jpeg';
import virtualTryOnImage from '../assetes/project/virtual-try-on.png';
import researchImage from '../assetes/project/research.jpg';
import ganImage from '../assetes/project/gan.jpg';
import objectDetectionImage from '../assetes/project/object-detection.png';
import ocrImage from '../assetes/project/OCR.jpeg';
import segmentationImage from '../assetes/project/segmentation.png';
import objectTrackingImage from '../assetes/project/object-tracking.jpeg';
import autismImage from '../assetes/project/autism.jpeg';

export const PROJECT_IMAGES = {
  1: aiAssistantImage,
  2: smartHomeImage,
  3: multiDocImage,
  4: diffusionImage,
  5: researchImage,
  6: transformerImage,
  7: ganImage,
  8: virtualTryOnImage,
  9: llamaImage,
  10: drugDiscoveryImage,
  11: objectDetectionImage,
  12: ocrImage,
  13: segmentationImage,
  14: objectTrackingImage,
  15: autismImage,
  16: eyeDiseaseImage,
  17: concreteImage,
  18: spamImage,
  19: recipeImage,
  20: doctorImage,
  21: cicdImage,
};

export const FALLBACK_IMAGE = fallbackImage;

export const getProjectImage = (id) => PROJECT_IMAGES[id] || fallbackImage;
