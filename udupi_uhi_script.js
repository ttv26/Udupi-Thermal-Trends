/**
 * FINAL STABLE UHI METHODOLOGY (2016-2025)
 * With Explicit Labels, Axis Titles, and Area Statistics
 */

var years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

// 1. DATA PROCESSING
var getLandsatData = function(year) {
  var start = ee.Date.fromYMD(year, 1, 1);
  var end = ee.Date.fromYMD(year, 12, 31);
  var col = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .merge(ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"))
    .filterBounds(aoi).filterDate(start, end).filter(ee.Filter.lt('CLOUD_COVER', 30));

  var img = col.median();
  var lst = img.select('ST_B10').multiply(0.00341802).add(149.0).subtract(273.15).rename('LST');
  var ndvi = img.normalizedDifference(['SR_B5', 'SR_B4']).rename('NDVI');
  var ndbi = img.normalizedDifference(['SR_B6', 'SR_B5']).rename('NDBI');
  
  return ee.Image([lst, ndvi, ndbi]).clip(aoi).set('year', year).set('system:time_start', start.millis());
};

var landsatCol = ee.ImageCollection(years.map(getLandsatData));
var latest = landsatCol.sort('system:time_start', false).first();

// 2. SUHI INTENSITY (Urban vs Rural Buffer)
var ruralBuffer = aoi.buffer(3000).difference(aoi);
var suhiIntensity = landsatCol.map(function(img) {
  var urban = img.select('LST').reduceRegion(ee.Reducer.mean(), aoi, 200).get('LST');
  var rural = img.select('LST').reduceRegion(ee.Reducer.mean(), ruralBuffer, 200).get('LST');
  var deltaT = ee.Number(urban).subtract(ee.Number(rural));
  return ee.Feature(null, {'year': img.get('year'), 'Intensity': deltaT, 'system:time_start': img.get('system:time_start')});
});

// 3. SOIL MOISTURE
var smCol = ee.ImageCollection('NASA/SMAP/SPL4SMGP/007').filterBounds(aoi).select('ssm');

// 4. PRINTING CHARTS WITH LABELS
print('--- 1. LAND SURFACE TEMPERATURE ---');
print(ui.Chart.image.series(landsatCol.select('LST'), aoi, ee.Reducer.mean(), 200)
  .setSeriesNames(['LST'])
  .setOptions({title: 'Land Surface Temperature Trend', vAxis: {title: 'Temp (°C)'}, colors: ['red'], trendlines: {0: {color: 'black', labelInLegend: 'Trend'}}}));

print('--- 2. VEGETATION INDEX ---');
print(ui.Chart.image.series(landsatCol.select('NDVI'), aoi, ee.Reducer.mean(), 200)
  .setSeriesNames(['NDVI'])
  .setOptions({title: 'Vegetation Index (NDVI) Trend', vAxis: {title: 'NDVI Value'}, colors: ['green'], trendlines: {0: {color: 'black', labelInLegend: 'Trend'}}}));

print('--- 3. BUILT-UP INDEX ---');
print(ui.Chart.image.series(landsatCol.select('NDBI'), aoi, ee.Reducer.mean(), 200)
  .setSeriesNames(['NDBI'])
  .setOptions({title: 'Built-up Index (NDBI) Trend', vAxis: {title: 'NDBI Value'}, colors: ['purple'], trendlines: {0: {color: 'black', labelInLegend: 'Trend'}}}));

print('--- 4. SOIL MOISTURE ---');
print(ui.Chart.image.series(smCol, aoi, ee.Reducer.mean(), 25000)
  .setSeriesNames(['Soil Moisture'])
  .setOptions({title: 'Surface Soil Moisture (mm)', vAxis: {title: 'mm'}, colors: ['blue']}));

print('--- 5. HEAT ISLAND INTENSITY ---');
print(ui.Chart.feature.byFeature(suhiIntensity, 'system:time_start', 'Intensity')
  .setSeriesNames(['Urban-Rural Gap'])
  .setOptions({title: 'SUHI Intensity (ΔT)', vAxis: {title: 'Delta T (°C)'}, colors: ['orange'], trendlines: {0: {color: 'black'}}}));

print('--- 6. COOLING EFFICIENCY ---');
var samples = latest.select(['NDVI', 'LST']).sample({region: aoi, scale: 100, numPixels: 300});
print(ui.Chart.feature.byFeature(samples, 'NDVI', 'LST').setChartType('ScatterChart')
  .setOptions({title: 'LST vs NDVI Correlation', hAxis: {title: 'NDVI'}, vAxis: {title: 'LST (°C)'}, pointSize: 2, trendlines: {0: {showR2: true, visibleInLegend: true}}}));

// 5. AREA STATISTICS (2020 vs 2025)
var lst2020 = ee.Image(landsatCol.filter(ee.Filter.eq('year', 2020)).first()).select('LST');
var lst2025 = ee.Image(landsatCol.filter(ee.Filter.eq('year', 2025)).first()).select('LST');
var cooledMask = lst2025.subtract(lst2020).lt(-2);

cooledMask.multiply(ee.Image.pixelArea()).reduceRegion({reducer: ee.Reducer.sum(), geometry: aoi, scale: 30})
  .evaluate(function(res) {
    var hectares = (res[Object.keys(res)[0]] / 10000).toFixed(2);
    print('TOTAL AREA COOLED (Hectares):');
  });

// 6. MAP LAYERS
Map.centerObject(aoi, 11);
Map.addLayer(latest.select('LST'), {min: 20, max: 40, palette: ['blue', 'yellow', 'red']}, 'Heat Map 2025');
Map.addLayer(cooledMask.selfMask(), {palette: ['cyan']}, 'Significant Cooling Zones');
