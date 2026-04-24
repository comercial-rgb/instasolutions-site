import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../../components/ui/SEOHead';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { COLORS, DOMAIN, EMAIL, SEGMENTOS_ATUACAO, UFS, BANDEIRAS } from '../../lib/constants';
import { credenciarSchema, type CredenciarFormData } from '../../lib/validators';
import { maskCNPJ, maskPhoneBR } from '../../lib/formUtils';

type Tipo = 'postos' | 'linha';

export default function CredenciarPage() {
  const { t } = useLanguage();
  const { addToast } = useToast();
  const [tipo, setTipo] = useState<Tipo>('postos');
  const [success, setSuccess] = useState(false);
  const startTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CredenciarFormData>({
    resolver: zodResolver(credenciarSchema),
  });

  // Masked field registrations
  const cnpjField = register('cnpj');
  const celularField = register('celular');
  const fixoField = register('fixo');

  async function onSubmit(data: CredenciarFormData) {
    if (Date.now() - startTime.current < 3000) return;
    if ((data as any).website) return;

    const fd = new FormData();
    fd.append('_subject', `[Credenciamento] Novo parceiro — ${tipo === 'postos' ? 'Posto' : 'Linha Leve'}`);
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');
    fd.append('Tipo', tipo === 'postos' ? 'Posto de Combustível' : 'Linha Leve / Oficina');
    Object.entries(data).forEach(([k, v]) => fd.append(k, v as string));

    try {
      await fetch(`https://formsubmit.co/${EMAIL}`, { method: 'POST', body: fd });
      setSuccess(true);
    } catch {
      addToast('error', t('contact.errorMsg'));
    }
  }

  if (success) {
    return (
      <>
        <SEOHead title="Solicitação enviada | InstaSolutions" noindex />
        <section className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
          <CheckCircle2 className="w-16 h-16 mb-4 text-green-500" />
          <h1 className="text-2xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
            {t('credential.successMsg')}
          </h1>
          <p className="text-neutral-500 max-w-md">{t('credential.redirecting')}</p>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Parceiros | Credenciar | InstaSolutions"
        description="Faça parte da rede de parceiros InstaSolutions. Credenciamento para postos de combustível e oficinas."
        canonical={`${DOMAIN}/parceiros/credenciar`}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: COLORS.azulCorp }}>
          {t('credential.title')}
        </h1>
        <p className="text-neutral-600 mb-6">{t('credential.subtitle')}</p>

        {/* Tipo tabs */}
        <div role="tablist" aria-label="Tipo de credenciamento" className="flex gap-2 mb-8">
          {(['postos', 'linha'] as Tipo[]).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={tipo === key}
              onClick={() => setTipo(key)}
              className="px-5 py-2 rounded-full text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              style={
                tipo === key
                  ? { backgroundColor: COLORS.azulTech, color: 'white', borderColor: COLORS.azulTech }
                  : { backgroundColor: 'white', color: COLORS.azulCorp, borderColor: COLORS.borderPill }
              }
            >
              {key === 'postos' ? t('credential.gasStations') : t('credential.automotive')}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          {/* Honeypot */}
          <input type="text" {...register('website' as any)} className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label={t('form.cnpj')} {...cnpjField} onChange={(e) => { e.target.value = maskCNPJ(e.target.value); cnpjField.onChange(e); }} error={errors.cnpj?.message} />
            <Input label={t('form.companyName')} {...register('razaoSocial')} error={errors.razaoSocial?.message} />
            <Input label={t('form.tradeName')} {...register('nomeFantasia')} error={errors.nomeFantasia?.message} />
            <Input label={t('form.neighborhood')} {...register('bairro')} error={errors.bairro?.message} />
            <Input label={t('form.address')} {...register('endereco')} error={errors.endereco?.message} className="sm:col-span-2" />
            <Select
              label={t('form.state')}
              options={UFS.map((u) => ({ value: u, label: u }))}
              {...register('estado')}
              error={errors.estado?.message}
            />
            <Input label={t('form.city')} {...register('cidade')} error={errors.cidade?.message} />
            <Input label={t('form.email')} type="email" {...register('email')} error={errors.email?.message} />
            <Input label={t('form.responsible')} {...register('responsavel')} error={errors.responsavel?.message} />
            <Input label={t('form.cpfRg')} {...register('cpfRg')} error={errors.cpfRg?.message} />
            <Input label={t('form.mobilePhone')} {...celularField} onChange={(e) => { e.target.value = maskPhoneBR(e.target.value); celularField.onChange(e); }} error={errors.celular?.message} />
            <Input label={t('form.landline')} {...fixoField} onChange={(e) => { e.target.value = maskPhoneBR(e.target.value); fixoField.onChange(e); }} error={errors.fixo?.message} />

            {tipo === 'postos' && (
              <Select
                label={t('form.flag')}
                options={BANDEIRAS.map((b) => ({ value: b, label: b }))}
                {...register('bandeira')}
                error={errors.bandeira?.message}
                className="sm:col-span-2"
              />
            )}
            {tipo === 'linha' && (
              <Select
                label={t('form.segment')}
                options={SEGMENTOS_ATUACAO.map((s) => ({ value: s, label: s }))}
                {...register('segmento')}
                error={errors.segmento?.message}
                className="sm:col-span-2"
              />
            )}

            <div className="sm:col-span-2 flex items-start gap-2">
              <input type="checkbox" id="termos-credenciar" required className="mt-0.5" />
              <label htmlFor="termos-credenciar" className="text-sm text-neutral-600">
                Confirmo que concordo com os termos e processo de credenciamento da InstaSolutions.
              </label>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
            {t('form.send')}
          </Button>
        </form>
      </section>
    </>
  );
}
