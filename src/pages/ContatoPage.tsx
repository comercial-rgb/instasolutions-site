import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/useToast';
import { COLORS, DOMAIN, EMAIL, SEGMENTOS_CLIENTE, TAMANHO_FROTA, SOLUCOES, UFS } from '../lib/constants';
import { contatoSchema, type ContatoFormData } from '../lib/validators';
import { maskCNPJ, maskPhoneBR } from '../lib/formUtils';

export default function ContatoPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const startTime = React.useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContatoFormData>({
    resolver: zodResolver(contatoSchema),
  });

  // Masked field registrations
  const cnpjField = register('cnpj');
  const celularField = register('celular');

  async function onSubmit(data: ContatoFormData) {
    // Rate-limit: block submit < 3s
    if (Date.now() - startTime.current < 3000) return;
    // Honeypot check
    if ((data as any).website) return;

    const fd = new FormData();
    fd.append('_subject', '[Site] Novo contato');
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');
    Object.entries(data).forEach(([k, v]) => fd.append(k, v as string));

    try {
      await fetch(`https://formsubmit.co/${EMAIL}`, { method: 'POST', body: fd });
      navigate('/obrigado');
    } catch {
      addToast('error', t('contact.errorMsg'));
    }
  }

  return (
    <>
      <SEOHead
        title="Contato | InstaSolutions — Fale com nosso time"
        description="Solicite uma demonstração ou envie uma mensagem para nossa equipe."
        canonical={`${DOMAIN}/contato`}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-3" style={{ color: COLORS.azulCorp }}>
          {t('contact.title2')}
        </h1>
        <p className="text-center text-neutral-600 mb-10">{t('contact.subtitle')}</p>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-6">
            <img
              src="/imagens/contato_foto.png"
              alt="Equipe InstaSolutions"
              className="rounded-3xl shadow-lg w-full"
              loading="lazy"
              decoding="async"
            />
            <div className="rounded-2xl border p-5 space-y-3 text-sm" style={{ borderColor: COLORS.borderPill }}>
              <InfoRow label={t('contact.headquartersAddress')}>
                <span>
                  Alameda Rio Negro, 1030, Ed. Stadium Corporate Alphaville, Sala 2304<br />
                  Barueri – SP, 06454-000
                </span>
              </InfoRow>
              <InfoRow label="WhatsApp / Telefone">
                <a href="tel:+551133366941" className="hover:underline" style={{ color: COLORS.azulTech }}>
                  (11) 3336-6941
                </a>
              </InfoRow>
              <InfoRow label={t('contact.email')}>
                <a href={`mailto:${EMAIL}`} className="hover:underline" style={{ color: COLORS.azulTech }}>
                  {EMAIL}
                </a>
              </InfoRow>
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
              {/* Honeypot */}
              <input type="text" {...register('website' as any)} className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label={t('form.cnpj')}
                  {...cnpjField}
                  onChange={(e) => { e.target.value = maskCNPJ(e.target.value); cnpjField.onChange(e); }}
                  error={errors.cnpj?.message}
                />
                <Input
                  label={t('form.companyName')}
                  {...register('razaoSocial')}
                  error={errors.razaoSocial?.message}
                />
                <Input
                  label={t('form.tradeName')}
                  {...register('nomeFantasia')}
                  error={errors.nomeFantasia?.message}
                />
                <Input
                  label={t('form.responsible')}
                  {...register('responsavel')}
                  error={errors.responsavel?.message}
                />
                <Input
                  label={t('form.email')}
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />
                <Input
                  label={t('form.mobilePhone')}
                  {...celularField}
                  onChange={(e) => { e.target.value = maskPhoneBR(e.target.value); celularField.onChange(e); }}
                  error={errors.celular?.message}
                />
                <Select
                  label={t('form.state')}
                  options={UFS.map((uf) => ({ value: uf, label: uf }))}
                  {...register('estado')}
                  error={errors.estado?.message}
                />
                <Input
                  label={t('form.city')}
                  {...register('cidade')}
                  error={errors.cidade?.message}
                />
                <Select
                  label={t('form.segment')}
                  options={SEGMENTOS_CLIENTE.map((s) => ({ value: s, label: s }))}
                  {...register('segmento')}
                  error={errors.segmento?.message}
                  className="sm:col-span-2"
                />
                <Select
                  label={t('form.fleetSize')}
                  options={TAMANHO_FROTA.map((s) => ({ value: s, label: s }))}
                  {...register('tamanhoFrota')}
                  error={errors.tamanhoFrota?.message}
                />
                <Select
                  label={t('form.solution')}
                  options={SOLUCOES.map((s) => ({ value: s, label: s }))}
                  {...register('solucao')}
                  error={errors.solucao?.message}
                />
              </div>
              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                {t('form.send')}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-semibold text-xs uppercase tracking-wider text-neutral-400 mb-1">{label}</div>
      <div style={{ color: COLORS.azulCorp }}>{children}</div>
    </div>
  );
}
