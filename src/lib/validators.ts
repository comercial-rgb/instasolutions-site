import { z } from 'zod';
import { isValidCNPJ } from './formUtils';

// Base fields shared across forms
const cnpjField = z
  .string()
  .min(1, 'CNPJ é obrigatório')
  .refine((v) => isValidCNPJ(v), 'CNPJ inválido');

const emailField = z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido');
const phoneField = z.string().min(14, 'Telefone inválido');

// Note: field names use camelCase to match react-hook-form register() calls.
// FormSubmit receives these keys as-is; they are readable in the email table.

export const credenciarSchema = z.object({
  cnpj: cnpjField,
  razaoSocial: z.string().min(2, 'Razão Social é obrigatória'),
  nomeFantasia: z.string().min(2, 'Nome Fantasia é obrigatório'),
  bairro: z.string().optional(),
  endereco: z.string().optional(),
  estado: z.string().min(2, 'Estado é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  email: emailField,
  responsavel: z.string().optional(),
  cpfRg: z.string().optional(),
  celular: z.string().optional(),
  fixo: z.string().optional(),
  bandeira: z.string().optional(),
  segmento: z.string().optional(),
  termos: z.literal(true, { errorMap: () => ({ message: 'É necessário aceitar os termos' }) }),
});

export type CredenciarFormData = z.infer<typeof credenciarSchema>;

export const queroSerClienteSchema = z.object({
  cnpj: cnpjField,
  razaoSocial: z.string().min(2, 'Razão Social é obrigatória'),
  nomeFantasia: z.string().min(2, 'Nome Fantasia é obrigatório'),
  bairro: z.string().optional(),
  endereco: z.string().optional(),
  estado: z.string().min(2, 'Estado é obrigatório'),
  cidade: z.string().min(2, 'Cidade é obrigatória'),
  email: emailField,
  responsavel: z.string().optional(),
  segmento: z.string().min(1, 'Segmento é obrigatório'),
  tamanhoFrota: z.string().min(1, 'Quantidade é obrigatória'),
  celular: phoneField.or(z.literal('')),
  fixo: z.string().optional(),
  solucao: z.string().min(1, 'Solução é obrigatória'),
});

export type QueroSerClienteFormData = z.infer<typeof queroSerClienteSchema>;

export const contatoSchema = z.object({
  cnpj: z.string().optional(),
  razaoSocial: z.string().optional(),
  nomeFantasia: z.string().optional(),
  bairro: z.string().optional(),
  endereco: z.string().optional(),
  estado: z.string().optional(),
  cidade: z.string().optional(),
  email: emailField,
  responsavel: z.string().min(2, 'Nome é obrigatório'),
  segmento: z.string().optional(),
  tamanhoFrota: z.string().optional(),
  celular: z.string().optional(),
  fixo: z.string().optional(),
  solucao: z.string().optional(),
});

export type ContatoFormData = z.infer<typeof contatoSchema>;

