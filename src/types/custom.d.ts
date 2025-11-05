// Quick ambient module and JSX declarations to silence TS errors when type packages are not installed.
// This is a minimal, temporary convenience. For production, prefer installing proper @types packages.

declare module 'react'
declare module 'react/jsx-runtime'
declare module 'framer-motion'
declare module 'recharts'
declare module 'lucide-react'
declare module 'react-router'
declare module '@clerk/clerk-react'

declare namespace JSX {
  interface IntrinsicElements {
    // allow any tag with any props to avoid missing JSX IntrinsicElements errors
    [elemName: string]: any
  }
}
