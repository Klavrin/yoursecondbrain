'use client'

import { createClient } from '@/utils/supabase/client'

const Header = async () => {
  const supabase = createClient()

  return <header onClick={async () => await supabase.auth.signOut()}>header</header>
}

export default Header
