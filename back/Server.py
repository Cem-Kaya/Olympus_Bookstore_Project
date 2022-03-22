from flask import  Flask


app= Flask (__name__)

@app.route("/members")
def mem():
    return {"members":["Cem","Baha","Murat","Emre","ugur","Can"] }

if __name__ == "__main__":
    app.run(debug=True)