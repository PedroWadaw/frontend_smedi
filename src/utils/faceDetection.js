import * as faceapi from "face-api.js";

let modelsLoaded = false;

export const loadFaceDetectionModels = async () => {
    if (modelsLoaded) return;

    try {
        
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models/tiny_face_detector");
        modelsLoaded = true;
    } catch (error) {
        console.error("Error loading face detection models:", error);
        throw new Error("Gagal memuat model deteksi wajah");
    }
};

export const detectFacesFromFile = async (file) => {
    if (!modelsLoaded) {
        await loadFaceDetectionModels();
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async (event) => {
            try {
                const img = new Image();

                img.onload = async () => {
                    try {
                        // Detect faces with increased confidence threshold
                        const detections = await faceapi
                            .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                            .withFaceLandmarks()
                            .withFaceDescriptors();

                        // Check if at least one face detected
                        if (detections.length > 0) {
                            resolve({
                                success: true,
                                detections: detections,
                                message: `Ditemukan ${detections.length} wajah`,
                            });
                        } else {
                            resolve({
                                success: false,
                                detections: [],
                                message: "Tidak ada wajah terdeteksi di foto",
                            });
                        }
                    } catch (error) {
                        console.error("Error detecting faces:", error);
                        reject(new Error("Gagal menganalisis foto"));
                    }
                };

                img.onerror = () => {
                    reject(new Error("Gagal membaca file gambar"));
                };

                img.src = event.target.result;
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => {
            reject(new Error("Gagal membaca file"));
        };

        reader.readAsDataURL(file);
    });
};

export const validateFacePhoto = async (file) => {
    try {
        // Validate file type
        if (!file.type.startsWith("image/")) {
            return {
                valid: false,
                error: "File harus berupa gambar",
            };
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return {
                valid: false,
                error: "Ukuran file terlalu besar (maksimal 5MB)",
            };
        }

        // Detect faces
        const result = await detectFacesFromFile(file);

        if (!result.success) {
            return {
                valid: false,
                error: result.message,
            };
        }

        return {
            valid: true,
            message: result.message,
            detections: result.detections,
        };
    } catch (error) {
        return {
            valid: false,
            error: error.message || "Gagal memproses foto",
        };
    }
};
