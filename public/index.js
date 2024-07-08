document.getElementById('llmForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const inputText = document.getElementById('inputText').value;
    const selectedLLM = document.getElementById('llmSelect').value;

    const response = await fetch(`https://your-api-gateway-url/${selectedLLM}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText })
    });

    const data = await response.json();
    document.getElementById('output').innerText = data.result;
});
