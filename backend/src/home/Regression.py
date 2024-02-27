import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn import  metrics

def ReadAsDataFrame(file, ext):
    if ext == 'xlxs':
        return pd.read_excel(file)
    elif ext == 'csv':
        return pd.read_csv(file)
    return None

def ApplyLinearRegression(file, ext, X, Y, test_size = .3, random_state=0):
    data = ReadAsDataFrame(file, ext)
    train = data.drop(Y, axis=1)
    if data is None:
        return None
    X_train, X_test, y_train, y_test = train_test_split(train ,data[Y], test_size=test_size, random_state=random_state)
    model = LinearRegression()
    model.fit(X_train,y_train)

    y_pred_train = model.predict(X_train)
    y_pred_test = model.predict(X_test)    
    return {
        "X_train"       :  X_train.values, 
        "X_test"        :   X_test.values,
        "y_train"       :   y_train.values,
        "y_test"        :   y_test.values,
        "y_pred_train"  :   y_pred_train,
        "y_pred_test"   :   y_pred_test
    }