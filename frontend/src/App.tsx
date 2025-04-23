import { useState } from 'react';

function App() {
  const [negocio, setNegocio] = useState('');
  const [tipo, setTipo] = useState('');
  const [estilo, setEstilo] = useState('');
  const [tema, setTema] = useState('');
  const [canal, setCanal] = useState('Instagram');
  const [quantidade, setQuantidade] = useState(1);
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const gerarPosts = async () => {
    setLoading(true);
    setPosts([]);

    try {
      const response = await fetch('http://localhost:8000/api/gerar-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          negocio,
          tipo,
          estilo,
          tema,
          canal,
          quantidade,
        }),
      });

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      setPosts(['❌ Erro ao se comunicar com a API']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1>Gerador de Posts - PostaFácil</h1>

      <label>Nome do negócio:</label>
      <input value={negocio} onChange={(e) => setNegocio(e.target.value)} />

      <label>Tipo de negócio:</label>
      <input value={tipo} onChange={(e) => setTipo(e.target.value)} />

      <label>Estilo de post:</label>
      <input value={estilo} onChange={(e) => setEstilo(e.target.value)} placeholder="ex: informativo, divertido..." />

      <label>Tema:</label>
      <input value={tema} onChange={(e) => setTema(e.target.value)} placeholder="ex: promoções, dicas, novidades..." />

      <label>Canal de publicação:</label>
      <select value={canal} onChange={(e) => setCanal(e.target.value)}>
        <option value="Instagram">Instagram</option>
        <option value="Facebook">Facebook</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="TikTok">TikTok</option>
      </select>

      <label>Quantidade de posts:</label>
      <input
        type="number"
        value={quantidade}
        min={1}
        max={10}
        onChange={(e) => setQuantidade(Number(e.target.value))}
      />

      <button onClick={gerarPosts} disabled={loading}>
        {loading ? 'Gerando...' : 'Gerar Posts'}
      </button>

      <hr />

      <div>
        <h2>Posts Gerados:</h2>
        <ul>
          {posts.map((post, idx) => (
            <li key={idx}>{post}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
