import { useState, useEffect } from 'react'
import emotionData from './emotionData'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [activeFeelingId, setActiveFeelingId] = useState(null)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const selectedEmotion = emotionData.find(e => e.id === selected)
  const totalFeelings = emotionData.reduce((sum, e) => sum + e.feelings.length, 0)

  useEffect(() => {
    if (!search.trim()) { setSearchResults([]); return }
    const q = search.toLowerCase()
    const results = []
    emotionData.forEach(e => {
      e.feelings.forEach(f => {
        if (
          f.name.toLowerCase().includes(q) ||
          f.definition.toLowerCase().includes(q) ||
          f.sample.toLowerCase().includes(q)
        ) {
          results.push({ emotion: e, feeling: f })
        }
      })
    })
    setSearchResults(results)
  }, [search])

  useEffect(() => { setActiveFeelingId(null) }, [selected])

  const valenceLabel = v =>
    ({ dark: 'Difficult', transitional: 'Complex', neutral: 'Neutral', light: 'Positive' })[v] || ''

  const visibleEmotions = search.trim()
    ? emotionData.filter(e =>
        e.label.toLowerCase().includes(search.toLowerCase()) ||
        e.feelings.some(f =>
          f.name.toLowerCase().includes(search.toLowerCase()) ||
          f.definition.toLowerCase().includes(search.toLowerCase())
        )
      )
    : emotionData

  const cardBase = (accent, isOpen) => ({
    background: isOpen ? '#ffffff' : '#fafafa',
    border: `1px solid ${isOpen ? accent + '66' : '#e8e8e8'}`,
    borderLeft: `3px solid ${isOpen ? accent : '#ddd'}`,
    borderRadius: 6,
    overflow: 'hidden',
    transition: 'all 0.15s ease',
    boxShadow: isOpen ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f4f2ee',
      color: '#2a2a2a',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* ── Header ── */}
      <header style={{
        background: '#ffffff',
        borderBottom: '1px solid #e0ddd8',
        padding: '2.5rem 2rem 2rem',
        maxWidth: 1120,
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <div style={{
          fontSize: '0.68rem', letterSpacing: '0.32em', color: '#555',
          textTransform: 'uppercase', marginBottom: '0.6rem',
          fontFamily: 'system-ui, sans-serif',
        }}>
          Getting in Touch with Your Own Feelings
        </div>

        <h1 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400, margin: 0,
          letterSpacing: '-0.02em', lineHeight: 1.1, color: '#1a1a1a',
        }}>
          Emotion Explorer
        </h1>

        <p style={{
          marginTop: '0.85rem', color: '#777', fontSize: '0.92rem',
          fontStyle: 'italic', maxWidth: 520, lineHeight: 1.65,
        }}>
          Emotions are broad signal states. Feelings are their specific textures.
          Understanding both is how you begin to know yourself.
        </p>

        <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: '#666', fontFamily: 'system-ui, sans-serif' }}>
          {emotionData.length} emotions · {totalFeelings} feelings
        </div>

        <div style={{ marginTop: '1.2rem', position: 'relative', maxWidth: 420 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search any feeling by name or description…"
            style={{
              width: '100%',
              background: '#f8f7f5',
              border: '1px solid #ddd',
              borderRadius: 6,
              padding: '0.6rem 2.2rem 0.6rem 1rem',
              color: '#2a2a2a',
              fontSize: '0.88rem',
              fontFamily: 'system-ui, sans-serif',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => { e.target.style.borderColor = '#aaa' }}
            onBlur={e => { e.target.style.borderColor = '#ddd' }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                position: 'absolute', right: 10, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: '#bbb',
                cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1, padding: 0,
              }}
            >×</button>
          )}
        </div>

        {search && (
          <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: '#666', fontFamily: 'system-ui, sans-serif' }}>
            {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
          </div>
        )}
      </header>

      {/* ── Body ── */}
      <div style={{ display: 'flex', flex: 1, maxWidth: 1120, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {/* Sidebar */}
        <nav style={{
          width: 190, flexShrink: 0,
          background: '#ffffff',
          borderRight: '1px solid #e0ddd8',
          padding: '1.5rem 0',
          overflowY: 'auto',
        }}>
          <div style={{
            fontSize: '0.58rem', letterSpacing: '0.28em', color: '#666',
            textTransform: 'uppercase', padding: '0 1.2rem',
            marginBottom: '0.6rem', fontFamily: 'system-ui, sans-serif',
          }}>
            Difficult → Positive
          </div>

          {visibleEmotions.map(e => (
            <button
              key={e.id}
              onClick={() => { setSelected(selected === e.id ? null : e.id); setSearch('') }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: selected === e.id ? `${e.accent}0d` : 'transparent',
                border: 'none',
                borderLeft: selected === e.id ? `3px solid ${e.accent}` : '3px solid transparent',
                padding: '0.6rem 1.2rem',
                color: selected === e.id ? e.accent : '#555',
                fontSize: '0.9rem', fontFamily: 'inherit', cursor: 'pointer',
                transition: 'all 0.15s ease',
                fontWeight: selected === e.id ? 600 : 400,
              }}
              onMouseEnter={ev => {
                if (selected !== e.id) {
                  ev.currentTarget.style.background = '#f5f3f0'
                  ev.currentTarget.style.color = '#222'
                }
              }}
              onMouseLeave={ev => {
                if (selected !== e.id) {
                  ev.currentTarget.style.background = 'transparent'
                  ev.currentTarget.style.color = '#555'
                }
              }}
            >
              <span>{e.label}</span>
              <span style={{
                display: 'block', fontSize: '0.6rem', color: '#888',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                marginTop: '0.08rem', fontFamily: 'system-ui, sans-serif',
              }}>
                {e.feelings.length} feelings
              </span>
            </button>
          ))}
        </nav>

        {/* Main panel */}
        <main style={{ flex: 1, padding: '2rem 2.5rem', overflowY: 'auto', background: '#f4f2ee' }}>

          {/* Search results */}
          {search && searchResults.length > 0 ? (
            <div>
              <div style={{
                fontSize: '0.62rem', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: '#666',
                marginBottom: '1.2rem', fontFamily: 'system-ui, sans-serif',
              }}>
                Results for "{search}"
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {searchResults.map((r, i) => (
                  <div key={i} style={{
                    background: '#fff',
                    border: '1px solid #eee',
                    borderLeft: `3px solid ${r.emotion.accent}`,
                    borderRadius: 6,
                    padding: '1rem 1.25rem',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{
                      fontSize: '0.6rem', letterSpacing: '0.2em',
                      textTransform: 'uppercase', color: r.emotion.accent,
                      marginBottom: '0.3rem', fontFamily: 'system-ui, sans-serif',
                    }}>
                      {r.emotion.label}
                    </div>
                    <div style={{ fontSize: '0.95rem', color: '#1a1a1a', marginBottom: '0.5rem', fontWeight: 500 }}>
                      {r.feeling.name}
                    </div>
                    <div style={{ fontSize: '0.83rem', color: '#666', lineHeight: 1.65, marginBottom: '0.6rem' }}>
                      {r.feeling.definition}
                    </div>
                    <div style={{
                      fontSize: '0.83rem', color: '#555', fontStyle: 'italic',
                      lineHeight: 1.72,
                      borderLeft: `2px solid ${r.emotion.accent}44`,
                      paddingLeft: '0.75rem',
                    }}>
                      {r.feeling.sample}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          ) : search && searchResults.length === 0 ? (
            <div style={{ color: '#aaa', fontStyle: 'italic', paddingTop: '2rem', fontFamily: 'system-ui, sans-serif', fontSize: '0.9rem' }}>
              No feelings matched "{search}".
            </div>

          ) : !selected ? (
            <div style={{ paddingTop: '5rem', textAlign: 'center' }}>
              <div style={{ color: '#ccc', fontSize: '2rem', marginBottom: '1rem' }}>◈</div>
              <div style={{ color: '#aaa', fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Select an emotion from the left<br />to explore its feelings.
              </div>
            </div>

          ) : selectedEmotion && (
            <div>
              {/* Emotion header */}
              <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e5e2de' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.9rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
                  <h2 style={{
                    fontSize: '2.1rem', fontWeight: 400, margin: 0,
                    color: selectedEmotion.accent, letterSpacing: '-0.01em',
                  }}>
                    {selectedEmotion.label}
                  </h2>
                  <span style={{
                    fontSize: '0.62rem', letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: '#888',
                    paddingTop: '0.4rem', fontFamily: 'system-ui, sans-serif',
                  }}>
                    {valenceLabel(selectedEmotion.valence)} Emotion
                  </span>
                </div>
                <p style={{ margin: 0, color: '#666', fontSize: '0.92rem', lineHeight: 1.68, maxWidth: 580, fontStyle: 'italic' }}>
                  {selectedEmotion.description}
                </p>
                <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#888', fontFamily: 'system-ui, sans-serif' }}>
                  {selectedEmotion.feelings.length} specific feelings
                </div>
              </div>

              {/* Feelings list */}
              <div>
                <div style={{
                  fontSize: '0.6rem', letterSpacing: '0.26em',
                  textTransform: 'uppercase', color: '#888',
                  marginBottom: '0.85rem', fontFamily: 'system-ui, sans-serif',
                }}>
                  Feelings within this emotion
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {selectedEmotion.feelings.map((f, i) => {
                    const fid = `${selected}-${i}`
                    const isOpen = activeFeelingId === fid
                    return (
                      <div key={fid} style={cardBase(selectedEmotion.accent, isOpen)}>
                        <button
                          onClick={() => setActiveFeelingId(isOpen ? null : fid)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            width: '100%', background: 'transparent', border: 'none',
                            padding: '0.75rem 1.2rem', textAlign: 'left', cursor: 'pointer',
                            fontFamily: 'inherit', fontSize: '0.9rem',
                            color: isOpen ? selectedEmotion.accent : '#333',
                            transition: 'color 0.15s ease',
                          }}
                        >
                          <span style={{ fontWeight: isOpen ? 600 : 400 }}>{f.name}</span>
                          <span style={{
                            fontSize: '0.7rem', color: '#bbb',
                            transform: isOpen ? 'rotate(180deg)' : 'none',
                            transition: 'transform 0.15s ease',
                            display: 'inline-block', marginLeft: '0.5rem',
                          }}>▾</span>
                        </button>

                        {isOpen && (
                          <div style={{ padding: '0 1.2rem 1.1rem' }}>
                            <div style={{
                              fontSize: '0.83rem', color: '#666', lineHeight: 1.7,
                              marginBottom: '0.85rem', paddingBottom: '0.7rem',
                              borderBottom: '1px solid #f0ede8',
                            }}>
                              <span style={{
                                fontSize: '0.58rem', letterSpacing: '0.2em',
                                textTransform: 'uppercase', color: '#888',
                                display: 'block', marginBottom: '0.35rem',
                                fontFamily: 'system-ui, sans-serif',
                              }}>Definition</span>
                              {f.definition}
                            </div>
                            <div style={{
                              fontSize: '0.85rem', color: '#555', lineHeight: 1.75,
                              fontStyle: 'italic',
                              borderLeft: `2px solid ${selectedEmotion.accent}55`,
                              paddingLeft: '0.9rem',
                            }}>
                              <span style={{
                                fontSize: '0.58rem', letterSpacing: '0.2em',
                                textTransform: 'uppercase', color: '#888',
                                display: 'block', marginBottom: '0.35rem',
                                fontStyle: 'normal', fontFamily: 'system-ui, sans-serif',
                              }}>What it feels like</span>
                              {f.sample}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        background: '#ffffff',
        borderTop: '1px solid #e0ddd8',
        padding: '1.25rem 2rem',
        fontSize: '0.72rem', color: '#666',
        textAlign: 'center', letterSpacing: '0.04em',
        fontFamily: 'system-ui, sans-serif',
      }}>
        Based upon Jonice Webb's Childhood Emotional Neglect work found in{' '}
        <em style={{ color: '#555' }}>Running on Empty</em> (2012) and{' '}
        <em style={{ color: '#555' }}>Running on Empty No More</em> (2017)
      </footer>
    </div>
  )
}
