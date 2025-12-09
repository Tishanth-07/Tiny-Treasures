import express from 'express';

const router = express.Router();

const provinceToDistricts = {
  Central: ["Kandy", "Matale", "Nuwara Eliya"],
  Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
  Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  Southern: ["Galle", "Matara", "Hambantota"],
  Western: ["Colombo", "Gampaha", "Kalutara"],
};

const districtToCities = {
  Colombo: ["Colombo", "Dehiwala", "Moratuwa", "Kotte", "Kaduwela"],
  Gampaha: ["Gampaha", "Negombo", "Ja-Ela", "Wattala", "Ragama"],
  Kalutara: ["Kalutara", "Panadura", "Horana", "Beruwala"],

  Kandy: ["Kandy", "Katugastota", "Peradeniya"],
  Matale: ["Matale", "Dambulla", "Sigiriya"],
  "Nuwara Eliya": ["Nuwara Eliya", "Hatton", "Nanu Oya"],

  Galle: ["Galle", "Hikkaduwa", "Ambalangoda"],
  Matara: ["Matara", "Weligama", "Akuressa"],
  Hambantota: ["Hambantota", "Tangalle", "Tissamaharama"],

  Jaffna: ["Jaffna", "Chavakachcheri", "Nallur"],
  Kilinochchi: ["Kilinochchi", "Pallai"],
  Mannar: ["Mannar", "Pesalai"],
  Mullaitivu: ["Mullaitivu", "Puthukkudiyiruppu"],
  Vavuniya: ["Vavuniya", "Nedunkeni"],

  Trincomalee: ["Trincomalee", "Kinniya", "Mutur"],
  Batticaloa: ["Batticaloa", "Eravur", "Kaluwanchikudy"],
  Ampara: ["Ampara", "Akkaraipattu", "Kalmunai"],
};

router.get('/getDistricts', (req, res) => {
  const { province } = req.query;
  if (!province || typeof province !== 'string') {
    return res.json({ success: false, districts: [], message: 'Missing or invalid province' });
  }
  const districts = provinceToDistricts[province] || [];
  if (districts.length === 0) {
    return res.json({ success: false, districts: [] });
  }
  return res.json({ success: true, districts });
});

router.get('/getCities', (req, res) => {
  const { district } = req.query;
  if (!district || typeof district !== 'string') {
    return res.json({ success: false, cities: [], message: 'Missing or invalid district' });
  }
  const cities = districtToCities[district] || [];
  if (cities.length === 0) {
    return res.json({ success: false, cities: [] });
  }
  return res.json({ success: true, cities });
});

export default router;
