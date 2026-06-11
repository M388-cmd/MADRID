async function run() {
  try {
    const res = await fetch("https://upload.wikimedia.org/wikipedia/commons/e/eb/Plano_del_Metro_de_Madrid_%2B_ML_y_Cercan%C3%ADas.svg", {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" }
    });
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Body preview:", text.substring(0, 100));
  } catch (err) {
    console.error("Error:", err);
  }
}
run();
