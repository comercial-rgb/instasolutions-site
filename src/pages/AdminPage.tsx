import React, { useEffect, useState, useCallback } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  LogOut, Plus, Pencil, Trash2, EyeOff, Eye,
  ChevronDown, ChevronUp, X, Save, Briefcase,
  Users, FileText, Download, AlertCircle, Loader2,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { VagaRow, CandidaturaRow } from '../lib/supabase';
import { COLORS } from '../lib/constants';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
}

// ─── Not configured ───────────────────────────────────────────────────────────

function NotConfigured() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md text-center">
        <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-xl font-bold mb-2" style={{ color: COLORS.azulCorp }}>Supabase não configurado</h1>
        <p className="text-neutral-600 text-sm">
          Defina <code className="bg-gray-100 px-1 rounded">VITE_SUPABASE_URL</code> e{' '}
          <code className="bg-gray-100 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> no arquivo{' '}
          <code className="bg-gray-100 px-1 rounded">.env.local</code> e faça novo deploy.
        </p>
      </div>
    </div>
  );
}

// ─── Spinner ─────────────────────────────────────────────────────────────────

function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const cls = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-10 h-10' : 'w-6 h-6';
  return <Loader2 className={`${cls} animate-spin`} style={{ color: COLORS.azulTech }} />;
}

function FullSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('E-mail ou senha incorretos.');
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm border"
        style={{ borderColor: COLORS.borderPill }}
      >
        <img src="/imagens/logo_topo.png" alt="InstaSolutions" className="h-12 mb-6 mx-auto" />
        <h1 className="text-xl font-bold text-center mb-6" style={{ color: COLORS.azulCorp }}>
          Painel Administrativo
        </h1>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-4">{error}</p>
        )}
        <label className="block text-sm font-medium mb-1 text-neutral-700">E-mail</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full border rounded-xl px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2"
          style={{ borderColor: COLORS.borderPill }}
        />
        <label className="block text-sm font-medium mb-1 text-neutral-700">Senha</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full border rounded-xl px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2"
          style={{ borderColor: COLORS.borderPill }}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-60"
          style={{ backgroundColor: COLORS.azulTech }}
        >
          {loading ? <Spinner size="sm" /> : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

// ─── Admin Panel ──────────────────────────────────────────────────────────────

function AdminPanel({ session }: { session: Session }) {
  const [tab, setTab] = useState<'vagas' | 'candidaturas'>('vagas');

  async function handleLogout() {
    await supabase!.auth.signOut();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b sticky top-0 z-30" style={{ borderColor: COLORS.borderPill }}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/imagens/logo_topo.png" alt="InstaSolutions" className="h-9" />
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: COLORS.bgPill, color: COLORS.azulCorp }}>Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500 hidden sm:block">{session.user.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-neutral-600 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-3.5 h-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex gap-2 mb-6">
          {([
            { key: 'vagas', label: 'Vagas', icon: Briefcase },
            { key: 'candidaturas', label: 'Candidaturas', icon: Users },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border transition-colors"
              style={
                tab === key
                  ? { backgroundColor: COLORS.azulTech, color: 'white', borderColor: COLORS.azulTech }
                  : { backgroundColor: 'white', color: COLORS.azulCorp, borderColor: COLORS.borderPill }
              }
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {tab === 'vagas' && <VagasTab />}
        {tab === 'candidaturas' && <CandidaturasTab />}
      </div>
    </div>
  );
}

// ─── Vagas Tab ────────────────────────────────────────────────────────────────

function VagasTab() {
  const [vagas, setVagas] = useState<VagaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVaga, setModalVaga] = useState<VagaRow | null | 'new'>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase!
      .from('vagas')
      .select('*')
      .order('created_at', { ascending: false });
    setVagas(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function toggleActive(v: VagaRow) {
    await supabase!.from('vagas').update({ active: !v.active }).eq('id', v.id);
    setVagas(prev => prev.map(x => x.id === v.id ? { ...x, active: !v.active } : x));
  }

  async function deleteVaga(id: string) {
    if (!confirm('Excluir esta vaga permanentemente?')) return;
    await supabase!.from('vagas').delete().eq('id', id);
    setVagas(prev => prev.filter(x => x.id !== id));
  }

  return (
    <div className="pb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg" style={{ color: COLORS.azulCorp }}>
          Vagas ({vagas.length})
        </h2>
        <button
          onClick={() => setModalVaga('new')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: COLORS.azulTech }}
        >
          <Plus className="w-4 h-4" /> Nova vaga
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : vagas.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <Briefcase className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p>Nenhuma vaga cadastrada.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: COLORS.borderPill }}>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs font-semibold uppercase tracking-wider text-neutral-500" style={{ borderColor: COLORS.borderPill }}>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3 hidden sm:table-cell">Localização</th>
                <th className="px-4 py-3 hidden md:table-cell">Criada em</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {vagas.map(v => (
                <tr key={v.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors" style={{ borderColor: COLORS.borderPill }}>
                  <td className="px-4 py-3 font-medium" style={{ color: COLORS.azulCorp }}>{v.title_pt}</td>
                  <td className="px-4 py-3 text-neutral-500 hidden sm:table-cell">{v.location_pt || '—'}</td>
                  <td className="px-4 py-3 text-neutral-400 hidden md:table-cell">{fmtDate(v.created_at)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActive(v)}
                      title={v.active ? 'Desativar' : 'Ativar'}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors"
                      style={v.active
                        ? { backgroundColor: '#dcfce7', color: '#15803d' }
                        : { backgroundColor: '#f3f4f6', color: '#6b7280' }
                      }
                    >
                      {v.active ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {v.active ? 'Ativa' : 'Inativa'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setModalVaga(v)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Editar"
                        style={{ color: COLORS.azulTech }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteVaga(v.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 transition-colors text-red-500"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalVaga !== null && (
        <VagaModal
          vaga={modalVaga === 'new' ? null : modalVaga}
          onClose={() => setModalVaga(null)}
          onSaved={() => { setModalVaga(null); load(); }}
        />
      )}
    </div>
  );
}

// ─── Vaga Modal ───────────────────────────────────────────────────────────────

const EMPTY_LOCALIZED = { pt: '', en: '' };

function VagaModal({ vaga, onClose, onSaved }: { vaga: VagaRow | null; onClose: () => void; onSaved: () => void }) {
  const isNew = !vaga;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [id, setId] = useState(vaga?.id || '');
  const [titlePt, setTitlePt] = useState(vaga?.title_pt || '');
  const [titleEn, setTitleEn] = useState(vaga?.title_en || '');
  const [locationPt, setLocationPt] = useState(vaga?.location_pt || '');
  const [locationEn, setLocationEn] = useState(vaga?.location_en || '');
  const [excerptPt, setExcerptPt] = useState(vaga?.excerpt_pt || '');
  const [excerptEn, setExcerptEn] = useState(vaga?.excerpt_en || '');
  const [body, setBody] = useState<Array<{ pt: string; en: string }>>(vaga?.body || [EMPTY_LOCALIZED]);
  const [reqs, setReqs] = useState<Array<{ pt: string; en: string }>>(vaga?.requirements || [EMPTY_LOCALIZED]);
  const [imageSrc, setImageSrc] = useState(vaga?.image_src || '');
  const [active, setActive] = useState(vaga?.active ?? true);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!id.trim()) { setError('O ID da vaga é obrigatório.'); return; }
    if (!titlePt.trim()) { setError('O título em português é obrigatório.'); return; }
    setSaving(true);
    setError('');

    const payload = {
      id: id.trim().toLowerCase().replace(/\s+/g, '-'),
      title_pt: titlePt.trim(),
      title_en: titleEn.trim() || titlePt.trim(),
      location_pt: locationPt.trim(),
      location_en: locationEn.trim(),
      excerpt_pt: excerptPt.trim(),
      excerpt_en: excerptEn.trim(),
      body: body.filter(p => p.pt.trim()),
      requirements: reqs.filter(r => r.pt.trim()),
      image_src: imageSrc.trim(),
      active,
    };

    const { error: err } = isNew
      ? await supabase!.from('vagas').insert(payload)
      : await supabase!.from('vagas').update(payload).eq('id', vaga!.id);

    if (err) { setError(err.message); setSaving(false); return; }
    onSaved();
  }

  function updateBodyItem(i: number, field: 'pt' | 'en', val: string) {
    setBody(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  }
  function updateReqItem(i: number, field: 'pt' | 'en', val: string) {
    setReqs(prev => prev.map((r, idx) => idx === i ? { ...r, [field]: val } : r));
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: COLORS.borderPill }}>
          <h2 className="font-bold text-lg" style={{ color: COLORS.azulCorp }}>
            {isNew ? 'Nova Vaga' : 'Editar Vaga'}
          </h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X className="w-5 h-5" /></button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="px-6 py-5 space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="ID único (kebab-case) *" hint="ex.: analista-de-ti">
              <input value={id} onChange={e => setId(e.target.value)} disabled={!isNew} className={inputCls} required />
            </Field>
            <Field label="Imagem (caminho em /public)">
              <input value={imageSrc} onChange={e => setImageSrc(e.target.value)} placeholder="/imagens/vagas/nome.jpg" className={inputCls} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Título PT *">
              <input value={titlePt} onChange={e => setTitlePt(e.target.value)} className={inputCls} required />
            </Field>
            <Field label="Título EN">
              <input value={titleEn} onChange={e => setTitleEn(e.target.value)} className={inputCls} />
            </Field>
            <Field label="Localização PT">
              <input value={locationPt} onChange={e => setLocationPt(e.target.value)} placeholder="Barueri · SP · Híbrido" className={inputCls} />
            </Field>
            <Field label="Localização EN">
              <input value={locationEn} onChange={e => setLocationEn(e.target.value)} placeholder="Barueri · SP · Hybrid" className={inputCls} />
            </Field>
            <Field label="Resumo PT *">
              <textarea value={excerptPt} onChange={e => setExcerptPt(e.target.value)} rows={2} className={inputCls} />
            </Field>
            <Field label="Resumo EN">
              <textarea value={excerptEn} onChange={e => setExcerptEn(e.target.value)} rows={2} className={inputCls} />
            </Field>
          </div>

          {/* Body paragraphs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-700">Descrição completa (parágrafos)</label>
              <button type="button" onClick={() => setBody(p => [...p, EMPTY_LOCALIZED])} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Adicionar parágrafo</button>
            </div>
            {body.map((p, i) => (
              <div key={i} className="grid sm:grid-cols-2 gap-2 mb-2 relative">
                <textarea value={p.pt} onChange={e => updateBodyItem(i, 'pt', e.target.value)} placeholder={`Parágrafo ${i + 1} PT`} rows={2} className={inputCls} />
                <textarea value={p.en} onChange={e => updateBodyItem(i, 'en', e.target.value)} placeholder={`Parágrafo ${i + 1} EN`} rows={2} className={inputCls} />
                {body.length > 1 && (
                  <button type="button" onClick={() => setBody(prev => prev.filter((_, idx) => idx !== i))} className="absolute -right-2 -top-2 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-neutral-700">Requisitos</label>
              <button type="button" onClick={() => setReqs(r => [...r, EMPTY_LOCALIZED])} className="text-xs text-blue-600 hover:underline flex items-center gap-1"><Plus className="w-3 h-3" /> Adicionar requisito</button>
            </div>
            {reqs.map((r, i) => (
              <div key={i} className="grid sm:grid-cols-2 gap-2 mb-2 relative">
                <input value={r.pt} onChange={e => updateReqItem(i, 'pt', e.target.value)} placeholder={`Requisito ${i + 1} PT`} className={inputCls} />
                <input value={r.en} onChange={e => updateReqItem(i, 'en', e.target.value)} placeholder={`Requisito ${i + 1} EN`} className={inputCls} />
                {reqs.length > 1 && (
                  <button type="button" onClick={() => setReqs(prev => prev.filter((_, idx) => idx !== i))} className="absolute -right-2 -top-2 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Active toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)} className="w-4 h-4 rounded accent-blue-600" />
            <span className="text-sm text-neutral-700">Vaga ativa (visível no site)</span>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2 border-t" style={{ borderColor: COLORS.borderPill }}>
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-sm border hover:bg-gray-50" style={{ borderColor: COLORS.borderPill }}>Cancelar</button>
            <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ backgroundColor: COLORS.azulTech }}>
              {saving ? <Spinner size="sm" /> : <Save className="w-4 h-4" />}
              {isNew ? 'Publicar vaga' : 'Salvar alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Candidaturas Tab ─────────────────────────────────────────────────────────

function CandidaturasTab() {
  const [candidaturas, setCandidaturas] = useState<CandidaturaRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterVaga, setFilterVaga] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase!
      .from('candidaturas')
      .select('*')
      .order('created_at', { ascending: false });
    setCandidaturas(data || []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function deleteCandidatura(id: string) {
    if (!confirm('Excluir esta candidatura?')) return;
    await supabase!.from('candidaturas').delete().eq('id', id);
    setCandidaturas(prev => prev.filter(c => c.id !== id));
  }

  async function downloadCV(cvPath: string) {
    const { data, error } = await supabase!.storage.from('curriculos').createSignedUrl(cvPath, 3600);
    if (error || !data) { alert('Não foi possível gerar o link do currículo.'); return; }
    window.open(data.signedUrl, '_blank');
  }

  const vagas = [...new Set(candidaturas.map(c => c.vaga_titulo).filter(Boolean))];
  const filtered = filterVaga ? candidaturas.filter(c => c.vaga_titulo === filterVaga) : candidaturas;

  return (
    <div className="pb-12">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-semibold text-lg" style={{ color: COLORS.azulCorp }}>
          Candidaturas ({filtered.length}{filterVaga ? ` de ${candidaturas.length}` : ''})
        </h2>
        <div className="flex items-center gap-2">
          <select
            value={filterVaga}
            onChange={e => setFilterVaga(e.target.value)}
            className="text-sm border rounded-xl px-3 py-1.5 focus:outline-none"
            style={{ borderColor: COLORS.borderPill }}
          >
            <option value="">Todas as vagas</option>
            {vagas.map(v => <option key={v!} value={v!}>{v}</option>)}
          </select>
          <button onClick={load} className="text-xs text-blue-600 hover:underline px-2">Atualizar</button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <Users className="w-10 h-10 mx-auto mb-2 opacity-40" />
          <p>Nenhuma candidatura recebida.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: COLORS.borderPill }}>
              {/* Row summary */}
              <div
                className="flex flex-wrap items-center gap-3 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: COLORS.azulCorp }}>{c.nome_completo}</p>
                  <p className="text-xs text-neutral-500">{c.email} · {c.celular}</p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: COLORS.bgPill, color: COLORS.azulTech }}>
                  {c.vaga_titulo || 'Sem vaga'}
                </span>
                <span className="text-xs text-neutral-400">{fmtDate(c.created_at)}</span>
                {expandedId === c.id
                  ? <ChevronUp className="w-4 h-4 text-neutral-400" />
                  : <ChevronDown className="w-4 h-4 text-neutral-400" />
                }
              </div>

              {/* Expanded details */}
              {expandedId === c.id && (
                <div className="px-5 pb-5 border-t pt-4 space-y-3" style={{ borderColor: COLORS.borderPill }}>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    <Detail label="Nome" value={c.nome_completo} />
                    <Detail label="E-mail" value={c.email} />
                    <Detail label="Celular" value={c.celular} />
                    <Detail label="Vaga" value={c.vaga_titulo || '—'} />
                    {c.estado && <Detail label="Estado" value={c.estado} />}
                    {c.cidade && <Detail label="Cidade" value={c.cidade} />}
                    {c.linkedin && <Detail label="LinkedIn" value={c.linkedin} link />}
                    {c.portfolio_url && <Detail label="Portfólio" value={c.portfolio_url} link />}
                    <Detail label="Idioma" value={c.idioma === 'en' ? 'Inglês' : 'Português'} />
                    <Detail label="Data" value={fmtDate(c.created_at)} />
                  </div>

                  {c.mensagem && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1">Mensagem</p>
                      <p className="text-sm text-neutral-700 whitespace-pre-wrap bg-gray-50 rounded-xl p-3">{c.mensagem}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-1">
                    {c.cv_path && (
                      <button
                        onClick={() => downloadCV(c.cv_path!)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                        style={{ backgroundColor: COLORS.azulTech }}
                      >
                        <Download className="w-4 h-4" /> Baixar Currículo
                      </button>
                    )}
                    <button
                      onClick={() => deleteCandidatura(c.id)}
                      className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Excluir
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

const inputCls =
  'w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1">
        {label}
        {hint && <span className="ml-1 text-xs text-neutral-400">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function Detail({ label, value, link }: { label: string; value: string; link?: boolean }) {
  return (
    <div>
      <span className="text-xs font-semibold text-neutral-400">{label}: </span>
      {link ? (
        <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">{value}</a>
      ) : (
        <span className="text-sm text-neutral-700">{value}</span>
      )}
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (!supabase) return <NotConfigured />;
  if (loading) return <FullSpinner />;
  if (!session) return <LoginForm />;
  return <AdminPanel session={session} />;
}
