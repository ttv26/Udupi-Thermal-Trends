# Udupi Thermal Trends

# Spatio-Temporal Analysis of Urban Heat Island Dynamics and Vegetation Recovery in Udupi (2016–2025)

## 📌 Project Overview
This project utilizes **Google Earth Engine (GEE)** to conduct a longitudinal assessment of the Surface Urban Heat Island (SUHI) effect in the Udupi region, Karnataka. By integrating multi-sensor satellite data from **Landsat 8 & 9**, the study quantifies the relationship between Land Surface Temperature (LST), Vegetation health (NDVI), and Urban expansion (NDBI).

Unlike many rapidly urbanizing coastal regions, the data indicates a significant **thermal recovery phase** starting post-2020, closely linked to a rise in regional green cover and soil moisture.

## 🚀 Key Findings
* **Thermal Mitigation:** A total of **4,201.89 Hectares** in the AOI experienced a significant cooling (>2°C drop) between 2020 and 2025.
* **Cooling Efficiency:** Statistical correlation shows a cooling rate of **1.84°C for every 0.1 increase in NDVI**.
* **UHI Decay:** The "Urban-Rural Gap" (SUHI Intensity) has narrowed by approximately 60% since its peak in 2017.
* **Peak Year:** 2020 was identified as the maximum thermal stress year (~37°C mean LST), followed by a steady recovery.
## 🌡️ Land Surface Temperature (LST) Analysis - 2025
The map below illustrates the surface thermal intensity across Udupi. Areas in **Red** indicate high-intensity heat zones (Urban Heat Islands), while **Blue** represents cooling vegetation and water bodies.


### 📊 Thermal Intensity Scale
| Visual | Temperature Range | Classification | Description |
| :---: | :---: | :--- | :--- |
| 🟦 | **< 27°C** | **Cool Zone** | Dense vegetation, water bodies, and plantations. |
| 🟨 | **28°C - 34°C** | **Moderate** | Suburban residential areas and mixed-use land. |
| 🟧 | **35°C - 38°C** | **High** | Dense urban concrete, asphalt, and commercial zones. |
| 🟥 | **> 39°C** | **Extreme** | Industrial areas, bare soil, and rock outcrops. |

> **Note:** LST values are derived from Landsat 9 TIRS (Band 10) data and processed using the Mono-window Algorithm.

<img width="815" height="634" alt="Screenshot 2026-03-25 122024" src="https://github.com/user-attachments/assets/0d18b10e-e9d5-410b-af8d-803274d7c24c" />

### 📊 Cooling/Warming Map [2016-2025]
| Visual | Classification |
| :---: | :---: | :--- | :--- |
| 🟦 | **Cooling Zone** |
| 🟧 | **Warming Zone** |

<img width="808" height="642" alt="Screenshot 2026-03-25 122038" src="https://github.com/user-attachments/assets/bc6d7489-963f-4bb7-9fd7-9e900c66e667" />


## 🛠️ Methodology & Formulas
The analysis uses the following indices to triangulate environmental health:
1. **LST (Celsius):** Derived from Landsat Thermal Band 10 using the standard scale/offset:  
   `LST = (DN * 0.00341802 + 149.0) - 273.15`
2. **NDVI:** $\frac{NIR - Red}{NIR + Red}$ (Used to measure vegetation recovery).
3. **NDBI:** $\frac{SWIR - NIR}{SWIR + NIR}$ (Used to monitor built-up density).
4. **SUHI Intensity:** Calculated as the difference between the **Urban AOI Mean LST** and a **3km Rural Buffer Mean LST**.

## 🗺️ Study Area
Study Area: The coastal district of Udupi, Karnataka, India. Known for its lateritic landscape and significant plantation agriculture (Arecanut/Coconut), which plays a key role in the observed NDVI recovery.

## 📊 Visualizations Included
The script generates 6 automated charts:
1. **LST Trend:** 13-year temperature trajectory.
2. **NDVI Trend:** Vegetation biomass growth.
3. **NDBI Trend:** Infrastructure/Urban footprint change.
4. **Soil Moisture:** Surface water retention (SMAP/GLDAS).
5. **SUHI Intensity:** The mathematical "Heat Gap" trendline.
6. **Scatter Plot:** Correlation between greenness and temperature (with $R^2$ proof).
7. 
<img width="1880" height="879" alt="ee-chart (4)" src="https://github.com/user-attachments/assets/68690ca3-93dc-4b30-8bdd-1e98acacf4da" />

<img width="1880" height="879" alt="ee-chart (3)" src="https://github.com/user-attachments/assets/8064c2bd-2ce6-418b-9151-f6bcc2759081" />

<img width="1880" height="879" alt="ee-chart (2)" src="https://github.com/user-attachments/assets/aaf24798-9bd4-447d-b588-02b00619996b" />

<img width="1880" height="879" alt="ee-chart (1)" src="https://github.com/user-attachments/assets/7ce0a90a-8787-4e1b-9b0d-93b194b9ede8" />

<img width="1880" height="879" alt="ee-chart" src="https://github.com/user-attachments/assets/9f2867ce-dcfa-46e6-9a32-323b1d99f36e" />

## 📝 How to Use
1. Open the [Google Earth Engine Code Editor]([https://code.earthengine.google.com/](https://code.earthengine.google.com/e94e1dcee56e130bbe17cc58a2f29a6a)).
2. Define a polygon named `aoi` over the Udupi region. (Available as Udupi.geojson)
3. Copy the script from `udupi_uhi_script.js` and click **Run**.
4. Check the **Console** for charts and the **Tasks** tab for map exports.

---
**Author:** V Tilak Teja 
**Data Sources:** NASA/USGS Landsat Program, USDA SMAP  
**Tools:** Google Earth Engine, JavaScript API
