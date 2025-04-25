import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import json
import os
from datetime import datetime, timedelta
import pickle

# مكتبات التعلم الآلي
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, roc_curve, auc, precision_recall_curve
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.feature_selection import SelectKBest, f_classif

# تحديد مسار البيانات
data_path = '/home/ubuntu/data_analysis/subjective/'

# قراءة بيانات الإصابات
injury_df = pd.read_csv(os.path.join(data_path, 'injury/injury.csv'))

# قراءة بيانات الحالة الصحية المصححة
fatigue_df = pd.read_csv(os.path.join(data_path, 'wellness/fatigue_fixed.csv'))
sleep_quality_df = pd.read_csv(os.path.join(data_path, 'wellness/sleep_quality_fixed.csv'))
sleep_duration_df = pd.read_csv(os.path.join(data_path, 'wellness/sleep_duration_fixed.csv'))
stress_df = pd.read_csv(os.path.join(data_path, 'wellness/stress_fixed.csv'))
soreness_df = pd.read_csv(os.path.join(data_path, 'wellness/soreness_fixed.csv'))
mood_df = pd.read_csv(os.path.join(data_path, 'wellness/mood_fixed.csv'))
readiness_df = pd.read_csv(os.path.join(data_path, 'wellness/readiness_fixed.csv'))

# قراءة بيانات حمل التدريب المصححة
daily_load_df = pd.read_csv(os.path.join(data_path, 'training-load/daily_load_fixed.csv'))
weekly_load_df = pd.read_csv(os.path.join(data_path, 'training-load/weekly_load_fixed.csv'))
acwr_df = pd.read_csv(os.path.join(data_path, 'training-load/acwr_fixed.csv'))
atl_df = pd.read_csv(os.path.join(data_path, 'training-load/atl_fixed.csv'))
ctl28_df = pd.read_csv(os.path.join(data_path, 'training-load/ctl28_fixed.csv'))
ctl42_df = pd.read_csv(os.path.join(data_path, 'training-load/ctl42_fixed.csv'))
strain_df = pd.read_csv(os.path.join(data_path, 'training-load/strain_fixed.csv'))
monotony_df = pd.read_csv(os.path.join(data_path, 'training-load/monotony_fixed.csv'))

print("تم قراءة جميع ملفات البيانات بنجاح")

# تحويل بيانات الحالة الصحية من الشكل العريض إلى الشكل الطويل
def reshape_wellness_data(df, metric_name):
    # نسخ البيانات
    df_copy = df.copy()
    
    # تحويل التاريخ إلى تنسيق datetime
    df_copy['Date'] = pd.to_datetime(df_copy['Date'], format='%d.%m.%Y')
    
    # تحويل البيانات من العريض إلى الطويل
    melted_df = pd.melt(df_copy, id_vars=['Date'], var_name='player_name', value_name=metric_name)
    
    return melted_df

# تطبيق التحويل على جميع بيانات الحالة الصحية
fatigue_long = reshape_wellness_data(fatigue_df, 'fatigue')
sleep_quality_long = reshape_wellness_data(sleep_quality_df, 'sleep_quality')
sleep_duration_long = reshape_wellness_data(sleep_duration_df, 'sleep_duration')
stress_long = reshape_wellness_data(stress_df, 'stress')
soreness_long = reshape_wellness_data(soreness_df, 'soreness')
mood_long = reshape_wellness_data(mood_df, 'mood')
readiness_long = reshape_wellness_data(readiness_df, 'readiness')

# دمج جميع بيانات الحالة الصحية
wellness_merged = fatigue_long.merge(sleep_quality_long, on=['Date', 'player_name'], how='outer')
wellness_merged = wellness_merged.merge(sleep_duration_long, on=['Date', 'player_name'], how='outer')
wellness_merged = wellness_merged.merge(stress_long, on=['Date', 'player_name'], how='outer')
wellness_merged = wellness_merged.merge(soreness_long, on=['Date', 'player_name'], how='outer')
wellness_merged = wellness_merged.merge(mood_long, on=['Date', 'player_name'], how='outer')
wellness_merged = wellness_merged.merge(readiness_long, on=['Date', 'player_name'], how='outer')

print("تم دمج بيانات الحالة الصحية بنجاح")

# تحويل بيانات حمل التدريب من الشكل العريض إلى الشكل الطويل
def reshape_training_data(df, metric_name):
    # نسخ البيانات
    df_copy = df.copy()
    
    # تحويل التاريخ إلى تنسيق datetime
    df_copy['Date'] = pd.to_datetime(df_copy['Date'], format='%d.%m.%Y')
    
    # تحويل البيانات من العريض إلى الطويل
    melted_df = pd.melt(df_copy, id_vars=['Date'], var_name='player_name', value_name=metric_name)
    
    return melted_df

# تطبيق التحويل على جميع بيانات حمل التدريب
daily_load_long = reshape_training_data(daily_load_df, 'daily_load')
weekly_load_long = reshape_training_data(weekly_load_df, 'weekly_load')
acwr_long = reshape_training_data(acwr_df, 'acwr')
atl_long = reshape_training_data(atl_df, 'atl')
ctl28_long = reshape_training_data(ctl28_df, 'ctl28')
ctl42_long = reshape_training_data(ctl42_df, 'ctl42')
strain_long = reshape_training_data(strain_df, 'strain')
monotony_long = reshape_training_data(monotony_df, 'monotony')

# دمج جميع بيانات حمل التدريب
training_merged = daily_load_long.merge(weekly_load_long, on=['Date', 'player_name'], how='outer')
training_merged = training_merged.merge(acwr_long, on=['Date', 'player_name'], how='outer')
training_merged = training_merged.merge(atl_long, on=['Date', 'player_name'], how='outer')
training_merged = training_merged.merge(ctl28_long, on=['Date', 'player_name'], how='outer')
training_merged = training_merged.merge(ctl42_long, on=['Date', 'player_name'], how='outer')
training_merged = training_merged.merge(strain_long, on=['Date', 'player_name'], how='outer')
training_merged = training_merged.merge(monotony_long, on=['Date', 'player_name'], how='outer')

print("تم دمج بيانات حمل التدريب بنجاح")

# تحويل عمود timestamp إلى تاريخ في بيانات الإصابات
injury_df['timestamp'] = pd.to_datetime(injury_df['timestamp'], format='%d.%m.%Y')

# إنشاء متغير هدف للإصابات (1 إذا حدثت إصابة في الأسبوع التالي، 0 إذا لم تحدث)
def create_injury_target(player_data, injury_df, window=7):
    # تحديد تواريخ الإصابات لكل لاعب
    player_injuries = injury_df[injury_df['player_name'] == player_data['player_name'].iloc[0]]
    injury_dates = player_injuries['timestamp'].tolist()
    
    # إنشاء متغير هدف للإصابات
    player_data['injury_next_day'] = 0
    player_data['injury_next_week'] = 0
    
    for idx, row in player_data.iterrows():
        # التحقق من وجود إصابة في اليوم التالي
        next_day = row['Date'] + timedelta(days=1)
        if any(d == next_day for d in injury_dates):
            player_data.at[idx, 'injury_next_day'] = 1
        
        # التحقق من وجود إصابة في الأسبوع التالي
        for i in range(1, window+1):
            future_day = row['Date'] + timedelta(days=i)
            if any(d == future_day for d in injury_dates):
                player_data.at[idx, 'injury_next_week'] = 1
                break
    
    return player_data

# دمج بيانات الحالة الصحية وحمل التدريب
all_data = wellness_merged.merge(training_merged, on=['Date', 'player_name'], how='outer')

# إضافة متغير الفريق
all_data['team'] = all_data['player_name'].apply(lambda x: x.split('-')[0])

print("تم دمج جميع البيانات بنجاح")

# تطبيق الدالة على كل لاعب
player_groups = all_data.groupby('player_name')
player_data_list = []

for player_name, player_data in player_groups:
    player_data_with_target = create_injury_target(player_data, injury_df)
    player_data_list.append(player_data_with_target)

# دمج البيانات مرة أخرى
all_data_with_target = pd.concat(player_data_list)

print("تم إنشاء متغير الهدف بنجاح")

# تحديد المتغيرات المستقلة والمتغير التابع
wellness_metrics = ['fatigue', 'sleep_quality', 'sleep_duration', 'stress', 'soreness', 'mood', 'readiness']
training_metrics = ['daily_load', 'weekly_load', 'acwr', 'atl', 'ctl28', 'ctl42', 'strain', 'monotony']
features = wellness_metrics + training_metrics
target = 'injury_next_week'  # استخدام الإصابات في الأسبوع التالي كمتغير هدف

# حذف الصفوف التي تحتوي على قيم مفقودة
model_data = all_data_with_target.dropna(subset=features + [target])

# عرض حجم البيانات بعد حذف القيم المفقودة
print(f"حجم البيانات بعد حذف القيم المفقودة: {model_data.shape}")

# تقسيم البيانات إلى متغيرات مستقلة ومتغير تابع
X = model_data[features]
y = model_data[target]

# تقسيم البيانات إلى مجموعة تدريب ومجموعة اختبار
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# تطبيع البيانات
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("تم تجهيز البيانات للنمذجة بنجاح")

# تدريب نموذج الغابة العشوائية
rf = RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42)
rf.fit(X_train_scaled, y_train)

# تقييم النموذج على بيانات الاختبار
y_pred_rf = rf.predict(X_test_scaled)
y_prob_rf = rf.predict_proba(X_test_scaled)[:, 1]

# عرض تقرير التصنيف
print("تقرير تصنيف نموذج الغابة العشوائية:")
print(classification_report(y_test, y_pred_rf))

# تحسين النموذج باستخدام البحث الشبكي
param_grid = {
    'n_estimators': [50, 100],
    'max_depth': [None, 10],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2],
    'class_weight': ['balanced']
}

# إنشاء نموذج البحث الشبكي (استخدام عدد أقل من المعلمات للتسريع)
grid_search = GridSearchCV(
    estimator=RandomForestClassifier(random_state=42),
    param_grid=param_grid,
    cv=3,
    scoring='roc_auc',
    n_jobs=-1,
    verbose=1
)

# تدريب النموذج
grid_search.fit(X_train_scaled, y_train)

# عرض أفضل المعلمات
print("أفضل المعلمات:")
print(grid_search.best_params_)

# استخدام أفضل نموذج
best_rf = grid_search.best_estimator_

# تقييم النموذج على بيانات الاختبار
y_pred_best_rf = best_rf.predict(X_test_scaled)
y_prob_best_rf = best_rf.predict_proba(X_test_scaled)[:, 1]

# عرض تقرير التصنيف
print("تقرير تصنيف أفضل نموذج:")
print(classification_report(y_test, y_pred_best_rf))

# حساب الدقة والاستدعاء لمختلف عتبات التنبؤ
precision, recall, thresholds = precision_recall_curve(y_test, y_prob_best_rf)

# تحديد العتبة المثلى
f1_scores = []
for i in range(len(precision)):
    if recall[i] == 0 or precision[i] == 0:
        f1_scores.append(0)
    else:
        f1 = 2 * (precision[i] * recall[i]) / (precision[i] + recall[i])
        f1_scores.append(f1)

# تحديد العتبة التي تعطي أعلى قيمة لمقياس F1
best_threshold_idx = np.argmax(f1_scores)
best_threshold = thresholds[best_threshold_idx] if best_threshold_idx < len(thresholds) else 0

print(f"العتبة المثلى: {best_threshold:.3f}")
print(f"الدقة عند العتبة المثلى: {precision[best_threshold_idx]:.3f}")
print(f"الاستدعاء عند العتبة المثلى: {recall[best_threshold_idx]:.3f}")
print(f"مقياس F1 عند العتبة المثلى: {f1_scores[best_threshold_idx]:.3f}")

# تطبيق العتبة المثلى على التنبؤات
y_pred_optimal = (y_prob_best_rf >= best_threshold).astype(int)

# عرض تقرير التصنيف باستخدام العتبة المثلى
print("تقرير التصنيف باستخدام العتبة المثلى:")
print(classification_report(y_test, y_pred_optimal))

# تحليل أهمية المتغيرات في النموذج المحسن
feature_importance = pd.DataFrame({
    'feature': features,
    'importance': best_rf.feature_importances_
})
feature_importance = feature_importance.sort_values('importance', ascending=False)
print("أهمية المتغيرات في النموذج:")
print(feature_importance)

# حفظ النموذج والمكونات الأخرى
model_components = {
    'model': best_rf,
    'scaler': scaler,
    'features': features,
    'threshold': best_threshold
}

# حفظ المكونات في ملف
with open('/home/ubuntu/visionguard_injury_prediction_model.pkl', 'wb') as f:
    pickle.dump(model_components, f)

print("تم حفظ النموذج بنجاح في /home/ubuntu/visionguard_injury_prediction_model.pkl")
