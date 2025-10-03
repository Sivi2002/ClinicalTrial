// analyticsController.js
const ClinicalTrial = require('../models/ClinicalTrial');

/**
 * Helper: parse an age string into an integer.
 */
function parseAge(value) {
  if (!value) return null;
  const s = String(value);
  const m = s.match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * GET /api/analytics/locations
 * Returns: [{ country, count }]
 * Count = number of unique facility names per country
 */
async function getLocations(req, res) {
  try {
    const pipeline = [
      
      { $unwind: '$protocolSection.contactsLocationsModule.locations' },
      
      { $match: { 'protocolSection.contactsLocationsModule.locations.country': { $exists: true, $ne: null } } },
      
      { $group: {
          _id: '$protocolSection.contactsLocationsModule.locations.country',
          facilities: { $addToSet: '$protocolSection.contactsLocationsModule.locations.facility' }
        }
      },
      { $project: {
          country: '$_id',
          count: { $size: '$facilities' },
          _id: 0
        }
      },
      { $sort: { count: -1 } }
    ];

    const result = await ClinicalTrial.aggregate(pipeline).allowDiskUse(true);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * GET /api/analytics/trials-per-city
 * Returns top 10 cities with number of unique facilities
 */
async function getTrialsPerCity(req, res) {
  try {
    const pipeline = [
      { $unwind: '$protocolSection.contactsLocationsModule.locations' },

      { $match: { 'protocolSection.contactsLocationsModule.locations.city': { $exists: true, $ne: null } } },

      { $group: {
          _id: '$protocolSection.contactsLocationsModule.locations.city',
          facilities: { $addToSet: '$protocolSection.contactsLocationsModule.locations.facility' }
        }
      },
      { $project: {
          city: '$_id',
          count: { $size: '$facilities' },
          _id: 0
        }
      },
      { $sort: { count: -1 } },
      
      { $limit: 10 }
    ];

    const result = await ClinicalTrial.aggregate(pipeline).allowDiskUse(true);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

/**
 * GET /api/analytics/demographics
 * Returns sex distribution and age bucket counts.
 * We compute age by using average(minimumAge, maximumAge) when both exist, else single value.
 */
async function getDemographics(req, res) {
  try {
    const docs = await ClinicalTrial.find({}, {
      'protocolSection.eligibilityModule.sex': 1,
      'protocolSection.eligibilityModule.minimumAge': 1,
      'protocolSection.eligibilityModule.maximumAge': 1
    }).lean();

    const sexCounts = {};
    const ageBuckets = {
      '0-18': 0,
      '19-35': 0,
      '36-55': 0,
      '56-75': 0,
      '76+': 0,
      'Unknown': 0
    };

    for (const d of docs) {
      const eligibility = d.protocolSection?.eligibilityModule || {};

      let s = eligibility.sex;
      if (!s) s = 'Unknown';
      else s = String(s).trim().toLowerCase();

      let normalizedSex = 'Other';
      if (s === 'female' || s === 'f' || s.includes('female')) normalizedSex = 'Female';
      else if (s === 'male' || s === 'm' || s.includes('male')) normalizedSex = 'Male';
      else if (s === 'all' || s.includes('all')) normalizedSex = 'All';
      else if (s === 'unknown' || s === '') normalizedSex = 'Unknown';

      sexCounts[normalizedSex] = (sexCounts[normalizedSex] || 0) + 1;

      const minA = parseAge(eligibility.minimumAge);
      const maxA = parseAge(eligibility.maximumAge);
      let avgA = null;
      if (minA && maxA) avgA = Math.round((minA + maxA) / 2);
      else if (minA) avgA = minA;
      else if (maxA) avgA = maxA;

      if (avgA === null) {
        ageBuckets['Unknown'] += 1;
      } else if (avgA <= 18) ageBuckets['0-18'] += 1;
      else if (avgA <= 35) ageBuckets['19-35'] += 1;
      else if (avgA <= 55) ageBuckets['36-55'] += 1;
      else if (avgA <= 75) ageBuckets['56-75'] += 1;
      else ageBuckets['76+'] += 1;
    }

    const sexDistribution = Object.keys(sexCounts).map(k => ({ label: k, count: sexCounts[k] }));
    const ageDistribution = Object.keys(ageBuckets).map(k => ({ bucket: k, count: ageBuckets[k] }));

    return res.json({ sexDistribution, ageDistribution });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { getLocations, getTrialsPerCity, getDemographics };
