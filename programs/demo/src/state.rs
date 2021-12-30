// Automatically generated rust module for 'state.proto' file

#![allow(non_snake_case)]
#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(unused_imports)]
#![allow(unknown_lints)]
#![allow(clippy::all)]
#![cfg_attr(rustfmt, rustfmt_skip)]


use quick_protobuf::{MessageRead, MessageWrite, BytesReader, Writer, WriterBackend, Result};
use quick_protobuf::sizeofs::*;
use super::*;

#[derive(Debug, Default, PartialEq, Clone)]
pub struct JarAccountState {
    pub authority: String,
    pub donation_amount: u64,
    pub last_donation_time: i64,
}

impl<'a> MessageRead<'a> for JarAccountState {
    fn from_reader(r: &mut BytesReader, bytes: &'a [u8]) -> Result<Self> {
        let mut msg = Self::default();
        while !r.is_eof() {
            match r.next_tag(bytes) {
                Ok(10) => msg.authority = r.read_string(bytes)?.to_owned(),
                Ok(16) => msg.donation_amount = r.read_uint64(bytes)?,
                Ok(24) => msg.last_donation_time = r.read_int64(bytes)?,
                Ok(t) => { r.read_unknown(bytes, t)?; }
                Err(e) => return Err(e),
            }
        }
        Ok(msg)
    }
}

impl MessageWrite for JarAccountState {
    fn get_size(&self) -> usize {
        0
        + if self.authority == String::default() { 0 } else { 1 + sizeof_len((&self.authority).len()) }
        + if self.donation_amount == 0u64 { 0 } else { 1 + sizeof_varint(*(&self.donation_amount) as u64) }
        + if self.last_donation_time == 0i64 { 0 } else { 1 + sizeof_varint(*(&self.last_donation_time) as u64) }
    }

    fn write_message<W: WriterBackend>(&self, w: &mut Writer<W>) -> Result<()> {
        if self.authority != String::default() { w.write_with_tag(10, |w| w.write_string(&**&self.authority))?; }
        if self.donation_amount != 0u64 { w.write_with_tag(16, |w| w.write_uint64(*&self.donation_amount))?; }
        if self.last_donation_time != 0i64 { w.write_with_tag(24, |w| w.write_int64(*&self.last_donation_time))?; }
        Ok(())
    }
}

