// Mask CNPJ: 00.000.000/0000-00
export function maskCNPJ(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

// Mask CPF: 000.000.000-00
export function maskCPF(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 11)
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

// Mask Phone BR: (00) 00000-0000 or (00) 0000-0000
export function maskPhoneBR(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
  return digits
    .replace(/^(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
}

// Mask CEP: 00000-000
export function maskCEP(value: string): string {
  return value
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, '$1-$2');
}

// Validate CNPJ with check digits
export function isValidCNPJ(value: string): boolean {
  const cnpj = value.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDigit = (cnpj: string, length: number): number => {
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += parseInt(cnpj.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    const result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result;
  };

  const d1 = calcDigit(cnpj, 12);
  const d2 = calcDigit(cnpj, 13);

  return d1 === parseInt(cnpj.charAt(12)) && d2 === parseInt(cnpj.charAt(13));
}
