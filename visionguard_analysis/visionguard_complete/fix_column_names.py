import pandas as pd
import os

# تحديد مسار البيانات
data_path = '/home/ubuntu/data_analysis/subjective/'

# قائمة بملفات الحالة الصحية
wellness_files = [
    'wellness/fatigue.csv',
    'wellness/sleep_quality.csv',
    'wellness/sleep_duration.csv',
    'wellness/stress.csv',
    'wellness/soreness.csv',
    'wellness/mood.csv',
    'wellness/readiness.csv'
]

# قائمة بملفات حمل التدريب
training_files = [
    'training-load/daily_load.csv',
    'training-load/weekly_load.csv',
    'training-load/acwr.csv',
    'training-load/atl.csv',
    'training-load/ctl28.csv',
    'training-load/ctl42.csv',
    'training-load/strain.csv',
    'training-load/monotony.csv'
]

# دالة لإصلاح أسماء الأعمدة وحفظ الملف
def fix_column_names(file_path):
    # قراءة الملف
    df = pd.read_csv(os.path.join(data_path, file_path))
    
    # الحصول على اسم العمود الأول
    first_column = df.columns[0]
    
    # إعادة تسمية العمود الأول إلى "Date"
    df.rename(columns={first_column: 'Date'}, inplace=True)
    
    # حفظ الملف المعدل
    fixed_file_path = os.path.join(data_path, file_path.replace('.csv', '_fixed.csv'))
    df.to_csv(fixed_file_path, index=False)
    
    print(f"تم إصلاح {file_path} وحفظه في {fixed_file_path}")
    
    return fixed_file_path

# إصلاح ملفات الحالة الصحية
fixed_wellness_files = []
for file in wellness_files:
    fixed_file = fix_column_names(file)
    fixed_wellness_files.append(fixed_file)

# إصلاح ملفات حمل التدريب
fixed_training_files = []
for file in training_files:
    fixed_file = fix_column_names(file)
    fixed_training_files.append(fixed_file)

print("\nتم إصلاح جميع الملفات بنجاح!")
