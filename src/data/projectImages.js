// Single source of truth for project artwork, shared by the 3D gallery and the
// flat card fallback. Imported eagerly so Vite fingerprints and bundles them.
//
// These are WebP rebuilds capped at 1280px, not the originals in ../assetes/project/.
// The originals ran to 5.00 MB and one was 5246px wide — as a GPU texture that
// single image cost 60 MB of video memory, which is what made the gallery slow
// to appear on phones. Same set, 0.80 MB.
import fallbackImage from '../assetes/image.jpg';
import aiAssistantImage from '../assetes/projectweb/ai-personnal-assistant.webp';
import smartHomeImage from '../assetes/projectweb/smart-home-llm.webp';
import multiDocImage from '../assetes/projectweb/multidocument-chatbot.webp';
import eyeDiseaseImage from '../assetes/projectweb/eye-disease-detector.webp';
import concreteImage from '../assetes/projectweb/concrete-optimizer.webp';
import spamImage from '../assetes/projectweb/spam-detector.webp';
import recipeImage from '../assetes/projectweb/recipe-app.webp';
import transformerImage from '../assetes/projectweb/transformer-scratch-tensorflow.webp';
import doctorImage from '../assetes/projectweb/doctor-appointment-booking.webp';
import cicdImage from '../assetes/projectweb/cicd.webp';
import llamaImage from '../assetes/projectweb/llama-7b.webp';
import diffusionImage from '../assetes/projectweb/diffusion-model-fintune.webp';
import drugDiscoveryImage from '../assetes/projectweb/drug-discovery.webp';
import virtualTryOnImage from '../assetes/projectweb/virtual-try-on.webp';
import researchImage from '../assetes/projectweb/research.webp';
import ganImage from '../assetes/projectweb/gan.webp';
import objectDetectionImage from '../assetes/projectweb/object-detection.webp';
import ocrImage from '../assetes/projectweb/ocr.webp';
import segmentationImage from '../assetes/projectweb/segmentation.webp';
import objectTrackingImage from '../assetes/projectweb/object-tracking.webp';
import autismImage from '../assetes/projectweb/autism.webp';

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
