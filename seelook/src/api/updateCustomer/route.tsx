// import { NextResponse } from 'next/server';
// import { createClient } from '@supabase/supabase-js';
//
// const supabaseUrl = 'https://axqkrxbbwiregxvkebjv.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
// const supabase = createClient(supabaseUrl, supabaseKey)
//
// export async function POST(request: Request) {
//     try {
//         const { gstin } = await request.json();
//
//         const { data, error } = await supabase
//             .from('customer')
//             .update({ gstin })
//             .eq('id', 'customer_id');
//
//         if (error) {
//             return NextResponse.json({ error: 'Failed to update customer table in Supabase' }, { status: 500 });
//         }
//
//         return NextResponse.json({ message: 'Customer table updated successfully', data });
//     } catch (error) {
//         return NextResponse.json({ error: 'Failed to update customer table in Supabase' }, { status: 500 });
//     }
// }